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
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Fingerprint } from "lucide-react";
import { Switch } from "../../ui/switch";
import { toast } from "sonner";
import { startRegistration } from "@simplewebauthn/browser";
import { motion } from "framer-motion";

export default function BiometricVerification({
	biometricEnabled,
    createdAt
}: {
	biometricEnabled?: boolean;
    createdAt?: Date
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
				<Button className="w-full justify-between" variant="outline">
					<Fingerprint className="mr-2 h-4 w-4" />
					<span className="w-full text-left">
						Verifikasi Biometrik
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold">
						Verifikasi Biometrik
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						Masuk lebih cepat & aman menggunakan sidik jari atau
						pengenalan wajah di perangkat kamu.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* Fingerprint visual */}
					<div className="flex justify-center">
						<motion.div
							animate={{
								scale: enabled ? 1.1 : 1,
								opacity: enabled ? 1 : 0.6,
							}}
							transition={{ duration: 0.3 }}
							className={`rounded-full p-6 border ${
								enabled
									? "bg-green-50 border-green-400"
									: "bg-gray-50 border-gray-300"
							}`}
						>
							<Fingerprint
								className={`h-12 w-12 ${
									enabled ? "text-green-500" : "text-gray-400"
								}`}
							/>
						</motion.div>
					</div>

					{/* Toggle Switch */}
					{!biometricEnabled ? (
						<div className="flex items-center justify-between rounded-lg border px-4 py-3">
							<div>
								<p className="font-medium">
									Aktifkan verifikasi biometrik
								</p>
								<p className="text-sm text-muted-foreground">
									Gunakan biometrik untuk login dan otentikasi
									di Tiketen.
								</p>
							</div>
							<Switch
								checked={enabled}
								onCheckedChange={handleToggle}
								className="cursor-pointer"
							/>
						</div>
					) : (
						<div className="space-y-2 rounded-lg border border-indigo-200 bg-indigo-50 p-3">
							<p className="text-sm font-medium text-indigo-700 flex items-center gap-1">
								<Fingerprint className="h-4 w-4 text-indigo-600" />
								Biometrik aktif
							</p>
							{createdAt && (
								<p className="text-xs text-indigo-600">
									Diaktifkan sejak{" "}
									{new Date(createdAt).toLocaleDateString(
										"id-ID"
									)}
								</p>
							)}
							<p className="text-xs text-indigo-500">
								Kelola biometrik melalui menu <b>Keamanan</b>.
							</p>
						</div>
					)}

					<p className="text-sm text-muted-foreground">
						Pastikan perangkat kamu mendukung biometrik. Jika
						dinonaktifkan, kamu tetap bisa login dengan password.
					</p>
				</div>

				<DialogFooter>
					<Button className="w-full" disabled={biometricEnabled}>Simpan</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
