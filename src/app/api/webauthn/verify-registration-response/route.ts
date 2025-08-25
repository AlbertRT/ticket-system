import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { NextResponse } from "next/server";
import { getCurrentUserDeviceAndCredential } from "@/lib/auth/biometric/getCurrentUserDeviceAndCredential";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	const body = await req.json();
	let credential;

	try {
		({ credential } = await getCurrentUserDeviceAndCredential());
	} catch (err) {
		return NextResponse.json(
			{ error: "terjadi kesalahan" },
			{ status: 401 }
		);
	}

	const verification = await verifyRegistrationResponse({
		response: body,
		expectedChallenge: credential.challenge,
		expectedOrigin: process.env.NEXT_PUBLIC_ORIGIN!,
		expectedRPID: process.env.NEXT_PUBLIC_DOMAIN!,
	});

	if (!verification.verified) {
		return NextResponse.json({ success: false });
	}

	const { credentialID, credentialPublicKey, counter } =
		verification.registrationInfo!;

	// Update credential yang sudah dibuat sebelumnya (saat generate)

    const defaultVerification = await prisma.user.findFirst({ where: { id: credential.userId, default_verification: null } })

    if (defaultVerification) {
        await prisma.user.update({
            where: {
                id: credential.userId
            },
            data: {
                default_verification: "BIOMETRIC"
            }
        })
    }

	await Promise.all([
		prisma.credential.update({
			where: {
				id: credential.id,
			},
			data: {
				credentialID: Buffer.from(credentialID).toString("base64"),
				publicKey: Buffer.from(credentialPublicKey).toString("base64"),
				counter,
				transports: "internal",
			},
		}),
		prisma.notification.create({
			data: {
				userId: credential.userId,
				title: "Biometrik berhasil diaktifkan",
				description:
					"Hore! Login sekarang tinggal tempel jari atau liat layar. Gak perlu ketik2 lagi. ✨",
				detail: "SUCCESS",
				is_readed: false,
			},
		}),
	]);

	return NextResponse.json({ success: true });
}
