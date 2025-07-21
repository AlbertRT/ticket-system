"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { CardInputForm } from "./CardInputForm";
import { generateToken } from "@/lib/payment/card-tokenizer";
import { toast } from "sonner";
import { UserPaymentChannel } from "@/types/type";
import BankCard from "./BankCard";
import { useSession } from "next-auth/react";
import { useUserPaymentChannels } from "@/app/hook/useUserPaymentChannel";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CardSection() {
	const [form, setForm] = useState({
		number: "",
		expiry: "",
		cvv: "",
	});
	const [loading, setLoading] = useState(false);
	const { paymentChannels, isLoading, refresh } = useUserPaymentChannels();
	const { data: session } = useSession();
	const [open, setOpen] = useState(false);

	if (isLoading) return <LoadingOverlay fullscreen />;
	if (!paymentChannels) return <p>Gagal memuat data kartu.</p>;

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const cardData = await generateToken(
				form,
				session?.user.id || "anonymous"
			);
            console.log(cardData)

			if (!cardData) throw new Error("Token gagal dibuat.");

			const res = await fetch("/api/payment/save", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token_id: cardData.token_id,
					token: cardData.token,
                    virtualCVV: cardData.virtualCVV,
					scheme: cardData.scheme,
					type: cardData.type,
					masked: cardData.masked,
					issuer_bank: cardData.issuer_bank?.name,
					logo: cardData.issuer_bank?.logo,
					tier: cardData.tier,
					expires: form.expiry,
				}),
			});

			if (!res.ok) {
				const { msg } = await res.json();
                console.log(msg)
				setForm({ number: "", expiry: "", cvv: "" });
				toast.error("Gagal menyimpan kartu.", { description: msg });
				return;
			}

			toast.success("Kartu baru berhasil ditambahkan.");
			refresh();
			setForm({ number: "", expiry: "", cvv: "" });
		} catch (err) {
			setForm({ number: "", expiry: "", cvv: "" });
			toast.error("Terjadi kesalahan saat menyimpan kartu.", {
				description: err as string,
			});
            console.log(err)
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<div className="p-4">
			{paymentChannels &&
				paymentChannels.map((channel: UserPaymentChannel) => (
					<BankCard
						channel={channel}
						key={channel.id}
						onUpdated={refresh}
					/>
				))}
			<div className="h-12 select-none relative flex items-center justify-center w-full">
				<Separator />
                <p className="absolute bg-white text-sm py-1 px-2">Atau</p>
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						className="mt-2 w-full h-[55px]"
						onClick={() => setOpen(true)}
						disabled={isLoading}
					>
						<CreditCard />
						<span>Tambah kartu</span>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Registrasi kartu baru.</DialogTitle>
						<DialogDescription>
							Simpan kartu mu biar ga repot kalau mau bayar.
						</DialogDescription>
					</DialogHeader>
					<CardInputForm
						value={form}
						onChange={setForm}
						onSubmit={handleSubmit}
						loading={loading}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
