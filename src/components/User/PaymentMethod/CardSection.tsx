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
import React from "react";

export default function CardSection() {
	return (
		<div className="p-4">
			<p className="font-bold text-muted-foreground">
				Kamu belum memiliki kartu.
			</p>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" className="mt-2 w-full">
						Tambah Kartu
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Registrasi kartu baru.</DialogTitle>
                        <DialogDescription>Kami menerima kartu dari Mastercard, Visa, AMEX, JCB dan UnionPay.</DialogDescription>
					</DialogHeader>
                    
				</DialogContent>
			</Dialog>
		</div>
	);
}
