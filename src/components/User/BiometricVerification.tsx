"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Fingerprint } from "lucide-react";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { startRegistration } from "@simplewebauthn/browser";

export default function BiometricVerification({
	biometricEnabled,
}: {
	biometricEnabled?: boolean;
}) {
	const [enabled, setEnabled] = useState(biometricEnabled || false);

	const handleToggle = async (checked: boolean) => {
		setEnabled(checked);

		if (checked) {
			try {
				// 1. Minta challenge dari server
				const res = await fetch(
					"/api/webauthn/generate-registration-options",
					{
						method: "POST",
					}
				);
				const options = await res.json();

				const attestation = await startRegistration(options);

				// 3. Kirim hasil ke server untuk verifikasi & simpan credential
				const verifyRes = await fetch(
					"/api/webauthn/verify-registration-response",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(attestation),
					}
				);

				const result = await verifyRes.json();
				console.log(result);

				if (result.success) {
					toast.success("Biometrik berhasil diaktifkan!");
					setEnabled(true);
				} else {
					toast.error("Gagal menyimpan credential biometrik.");
					setEnabled(false);
				}
			} catch (error) {
				console.error(error);
				toast.error("Gagal mengaktifkan biometrik.");
				setEnabled(false);
			}
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full justify-between" variant={"outline"}>
					<Fingerprint className="mr-2 h-4 w-4" />
					<span className="w-full">Verifikasi Biometrik</span>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Verifikasi Biometrik</DialogTitle>
					<DialogDescription>
						Fitur ini memungkinkan Kamu untuk masuk ke akun Tiketen
						menggunakan biometrik seperti sidik jari atau wajah.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<div className="border w-full h-[60px] rounded-md flex items-center justify-center">
						<p className="text-sm text-gray-500 mr-2 select-none">
							Aktifkan verifikasi biometrik
						</p>
						<Switch
							className="cursor-pointer"
							onCheckedChange={handleToggle}
							checked={enabled}
						/>
					</div>
					<p>
						Pastikan device kamu mendukung untuk mengaktifkan fitur
						ini.
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button className="w-full cursor-pointer">Oke</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
