"use client";

import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GetDevice } from "@/action/QuickLoginAction";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserDevice } from "@/types/type";
import { Separator } from "./separator";
import { Fingerprint } from "lucide-react";
import { startAuthentication } from "@simplewebauthn/browser";
import { toast } from "sonner";

export function QuickLogin({
	device_token,
	biometricEnabled,
}: {
	device_token: string;
	biometricEnabled?: boolean;
}) {
	const [user_device, setUserDevice] = useState<UserDevice | null>(null);
	useEffect(() => {
		(async () => {
			const device = await GetDevice(device_token);
			setUserDevice(device);
		})();
	}, []);

	const handleQuickLogin = async () => {
		if (!user_device) {
			return;
		}

		await signIn("device-login", {
			device_token,
			device_id: user_device.id,
			redirectTo: "/",
		});
	};

    const handleBiometricLogin = async () => {
		try {
			const res = await fetch(
				"/api/webauthn/generate-authentication-options",
				{
					method: "POST",
					body: JSON.stringify({ user_id: user_device?.user_id }),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			const options = await res.json();
			const assertionResponse = await startAuthentication(options);

			await signIn("biometric-login", {
				user_id: user_device?.user_id,
				credential_id: assertionResponse.id,
				response: JSON.stringify(assertionResponse),
				redirect: true,
				callbackUrl: "/",
			});
		} catch (e) {
			console.error("Biometric login error:", e);
			toast.error("Terjadi kesalahan saat verifikasi biometrik.");
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="cursor-pointer">Masuk</Button>
			</DialogTrigger>
			<DialogContent aria-description="Masuk dengan perangkat yang sudah terdaftar">
				<DialogHeader>
					<DialogTitle>
						Sudah pernah login? Cari perangkat mu disini!
					</DialogTitle>
				</DialogHeader>
				<div
					className="w-full cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
					onClick={handleQuickLogin}
				>
					<div className="flex items-center gap-4 p-4 rounded-lg">
						<img
							src={
								user_device?.user.image || "/default-avatar.png"
							}
							alt={user_device?.user.name || "User Avatar"}
							className="w-12 h-12 rounded-full"
						/>
						<div>
							<h3 className="text-lg font-semibold">
								{user_device?.user.name ||
									"Pengguna Tanpa Nama"}
							</h3>
							<p className="text-sm text-gray-600">
								{user_device?.device_name ||
									"Perangkat Tidak Dikenal"}
							</p>
						</div>
					</div>
				</div>
				{biometricEnabled && (
					<div className="space-y-2">
						<Separator className="my-4" />
                        <h3 className="text-lg font-semibold">
                            Verifikasi Biometrik
                        </h3>
						<p className="text-sm text-gray-500">
							Kamu dapat menggunakan biometrik untuk masuk ke akun
							mu.
						</p>
						<Button className="mt-2 w-full cursor-pointer" variant="outline" onClick={handleBiometricLogin}>
							<Fingerprint className="mr-2 h-4 w-4" />
                            Verifikasi Biometrik
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
