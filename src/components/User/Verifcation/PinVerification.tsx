"use client";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { PinInput } from "@/components/ui/pin-input";
import { hashPin } from "@/lib/helper/generate-pin-blocks";
import { toast } from "sonner";

export function PinVerificationDialog({
	PINEnabled,
	createdAt,
}: {
	PINEnabled: boolean;
	createdAt?: Date;
}) {
	const [enabled, setEnabled] = useState(false || PINEnabled);
	const [pin, setPin] = useState("");

	const handleToggle = (val: boolean) => {
		setEnabled(val);
		if (!val) setPin(""); // reset pin kalau dinonaktifkan
	};

	const savePIN = async () => {
		const PINBlocks = await hashPin(pin);

		try {
			const res = await fetch("/api/user/security/pin/save", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ blocks: PINBlocks }),
			});

			if (!res.ok) {
				console.log(await res.json());
				toast.error("Gagal menyimpan PIN");
				setEnabled(false);
			} else {
				toast.success("PIN Berhasil di buat");
			}
		} catch (error) {
			toast.error("Terjadi kesalahan");
			console.log(error);
			setEnabled(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full justify-between" variant="outline">
					<Lock className="mr-2 h-4 w-4" />
					<span className="w-full text-left">Verifikasi PIN</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold">
						Verifikasi PIN
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground">
						Tambahkan PIN untuk keamanan tambahan saat login atau
						melakukan pembayaran.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* Lock visual */}
					<div className="flex justify-center">
						<motion.div
							animate={{
								scale: enabled ? 1.1 : 1,
								opacity: enabled ? 1 : 0.6,
							}}
							transition={{ duration: 0.3 }}
							className={`rounded-full p-6 border ${
								enabled
									? "bg-blue-50 border-blue-400"
									: "bg-gray-50 border-gray-300"
							}`}
						>
							<Lock
								className={`h-12 w-12 ${
									enabled ? "text-blue-500" : "text-gray-400"
								}`}
							/>
						</motion.div>
					</div>

					{!PINEnabled ? (
						<div className="flex items-center justify-between rounded-lg border px-4 py-3">
							<div>
								<p className="font-medium">Aktifkan PIN</p>
								<p className="text-sm text-muted-foreground">
									Gunakan PIN untuk login & otorisasi
									transaksi.
								</p>
							</div>
							<Switch
								checked={enabled}
								onCheckedChange={handleToggle}
								className="cursor-pointer"
							/>
						</div>
					) : (
						<div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
							<p className="text-sm font-medium text-indigo-700 flex items-center gap-1">
								<Lock className="h-4 w-4 text-indigo-600" />
								PIN keamanan aktif
							</p>
							{createdAt && (
								<p className="text-xs text-blue-600">
									Diaktifkan sejak{" "}
									{new Date(createdAt).toLocaleDateString(
										"id-ID"
									)}
								</p>
							)}
							<p className="text-xs text-blue-500">
								Kelola PIN melalui menu <b>Keamanan</b>.
							</p>
						</div>
					)}

					{/* PIN input (mu, createdAt?: Datencul kalau aktif) */}
					{!PINEnabled && enabled && (
						<div className="flex justify-center space-x-2">
							<PinInput
								length={6}
								value={pin}
								onChange={setPin}
							/>
						</div>
					)}

					<p className="text-sm text-muted-foreground">
						PIN ini akan digunakan setiap kali kamu melakukan login
						atau pembayaran yang membutuhkan verifikasi tambahan.
					</p>
				</div>

				<DialogFooter>
					<Button
						className="w-full"
						disabled={enabled && pin.length < 6}
						onClick={savePIN}
					>
						Simpan
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
