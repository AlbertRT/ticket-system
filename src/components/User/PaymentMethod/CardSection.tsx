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
import React, { useState } from "react";
import { CardInputForm } from "./CardInputForm";
import { generateToken } from "@/lib/payment/card-tokenizer";
import { toast } from "sonner";
import { UserPaymentChannel } from "@/types/type";
import BankCard from "./BankCard";
import useSWR from "swr";
import { SessionProvider, useSession } from "next-auth/react";
import { useUserPaymentChannels } from "@/app/hook/useUserPaymentChannel";
import LoadingOverlay from "@/components/ui/loading-overlay";

export default function CardSection() {
	const [form, setForm] = useState({
		number: "",
		expiry: "",
		cvv: "",
	});
	const [loading, setLoading] = useState(false);
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { paymentChannels, isLoading, refresh } = useUserPaymentChannels();
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    if (isLoading) return <p>Memuat kartu..</p>
    if (!paymentChannels) return <p>Gagal memuat data kartu.</p>;

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const cardData = await generateToken(
				form,
				session?.user.id || "anonymous"
			);

			if (!cardData) throw new Error("Token gagal dibuat.");

			const res = await fetch("/api/payment/save", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					token_id: cardData.token_id,
					token: cardData.token,
					scheme: cardData.scheme,
					type: cardData.type,
					masked: cardData.masked,
					issuer_bank: cardData.issuer_bank?.replace(/\.$/, ""),
					tier: cardData.tier,
					expires: form.expiry,
				}),
			});

			if (!res.ok) {
                const {msg} = await res.json()
                console.log(msg)
                setForm({ number: "", expiry: "", cvv: "" });
                toast.error("Gagal menyimpan kartu.", { description: msg })
                return
            }

			toast.success("Kartu baru berhasil ditambahkan.");
			refresh();
			setForm({ number: "", expiry: "", cvv: "" });
		} catch (err) {
            setForm({ number: "", expiry: "", cvv: "" });
			toast.error("Terjadi kesalahan saat menyimpan kartu.", { description: err as string });
		} finally {
			setLoading(false);
            setOpen(false)
		}
	};

	return (
		<div className="p-4">
            {isLoading && <LoadingOverlay fullscreen />}
			{paymentChannels &&
				paymentChannels.map((channel: UserPaymentChannel) => (
					<BankCard channel={channel} key={channel.id} onUpdated={refresh} />
				))}
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						className="mt-2 w-full"
						onClick={() => setOpen(true)}
						disabled={isLoading}
					>
						Tambah Kartu
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
