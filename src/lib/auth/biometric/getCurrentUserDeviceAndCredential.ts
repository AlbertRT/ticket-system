// lib/auth/biometric/getCurrentUserDeviceAndCredential.ts

import { cookies } from "next/headers";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getCurrentUserDeviceAndCredential = async (
	device_token: string | null = null
) => {
	const cookie = await cookies();
	const session = await auth();
	const userId = session?.user?.id || null;

	// Ambil token dari argumen atau cookie
	const token = device_token || cookie.get("device_token")?.value;
	if (!token) throw new Error("Device token not found");

	// Cari device berdasarkan token + userId (kalau ada)
	const device = await prisma.userDevice.findFirst({
		where: {
			device_token: token,
			...(userId ? { userId } : {}),
		},
	});

	if (!device) throw new Error("Device not found");

	// Cari credential yang kosong (berarti belum register)
	const credential = await prisma.credential.findFirst({
		where: {
			deviceId: device.id,
			...(userId ? { userId } : {}),
		},
	});

	if (!credential) throw new Error("Credential not found");

	return { device, credential, session };
};
