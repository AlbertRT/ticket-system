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



export default function CardSection({
	paymentChannel,
}: {
	paymentChannel: UserPaymentChannel[] | null;
}) {
	const [form, setForm] = useState({
		number: "",
		expiry: "",
		cvv: "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		console.log("triggered.");
		setLoading(true);

		try {
			const cardData = await generateToken(form, "user-id-placeholder");
			const body = {
				token_id: cardData.token_id,
				token: cardData.token,
				scheme: cardData.scheme,
				type: cardData.type,
				masked: cardData.masked,
				issuer_name: cardData.issuer_name,
				expires: form.expiry,
			};


			if (cardData) {
				const res = await fetch("/api/payment/save", {
					headers: {
						"Content-Type": "application/json",
					},
					method: "POST",
					body: JSON.stringify(body),
				});

				if (res.ok) {
					setLoading(false);
					toast.success("Kartu baru berhasil di tambah.");
				} else {
					setLoading(false);
					toast.error("Terjadi kesalahan");
				}
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
			toast.error("Gagal membuat token kartu. Silakan coba lagi.");
		}
	};

	return (
		<div className="p-4">
			{paymentChannel ? (
				paymentChannel.map((channel) => (
					<BankCard channel={channel} key={channel.id} />
				))
			) : (
				<p className="font-bold text-muted-foreground">
					Kamu belum memiliki kartu.
				</p>
			)}
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" className="mt-2 w-full">
						Tambah Kartu
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Registrasi kartu baru.</DialogTitle>
						<DialogDescription>
							Kami menerima kartu dari Mastercard, Visa, AMEX, JCB
							dan UnionPay.
						</DialogDescription>
					</DialogHeader>
					<CardInputForm
						value={form}
						onChange={setForm}
						onSubmit={handleSubmit}
						submitLabel="Pakai Kartu ini"
						loading={loading}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
