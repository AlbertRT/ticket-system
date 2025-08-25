import { auth } from "@/auth";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	const cookie = await cookies();
	const session = await auth();
	const userId = session?.user?.id || null;

	try {
		// Ambil token dari argumen atau cookie
		const token = cookie.get("device_token")?.value;
		if (!token) throw new Error("Device token not found");

		// Cari device berdasarkan token + userId (kalau ada)
		const device = await prisma.userDevice.findFirst({
			where: {
				device_token: token,
				...(userId ? { userId } : {}),
			},
		});

		if (!device)
			return NextResponse.json(
				{ msg: "No Device found" },
				{ status: 404 }
			);

		// Cari credential yang kosong (berarti belum register)
		const credential = await prisma.credential.findFirst({
			where: {
				deviceId: device.id,
				...(userId ? { userId } : {}),
			},
			select: {
				id: true,
				is_active: true,
				createdAt: true,
				userId: true,
				deviceId: true,
				challenge: true,
			},
		});

		const pin = await prisma.pinBlocks.findFirst({
			where: { userId: session?.user.id },
			select: { createdAt: true, userId: true, is_active: true },
		});

		if (!credential) throw new Error("Credential not found");

		const def_verification = await prisma.user.findFirst({
			where: { id: userId as string },
		});

		return NextResponse.json(
			{
				device,
				credential: {
					...credential,
					is_default:
						def_verification?.default_verification === "BIOMETRIC",
				},
				pin: {
					...pin,
					is_default:
						def_verification?.default_verification === "PIN",
				},
			},
			{ status: 200 }
		);
	} catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Gagal memuat data" }, { status: 500 })
    }

}
