import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	const { user_id, device_id } = await req.json();

	if (!user_id || !device_id) {
		return NextResponse.json(
			{ error: "Missing user_id or device_id" },
			{ status: 400 }
		);
	}

	const user = await prisma.user.findUnique({
		where: { id: user_id },
	});

	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 404 });
	}

	const credential = await prisma.credential.findFirst({
		where: {
			userId: user_id,
			deviceId: device_id,
		},
	});

	if (!credential) {
		return NextResponse.json(
			{ error: "Credential not found for device" },
			{ status: 404 }
		);
	}

	const options = await generateAuthenticationOptions({
		allowCredentials: [
			{
				id: Buffer.from(credential.credentialID, "base64url"),
				type: "public-key",
			},
		],
		userVerification: "preferred",
		rpID: process.env.NEXT_PUBLIC_DOMAIN!,
	});

	await prisma.credential.update({
		where: { id: credential.id },
		data: { challenge: options.challenge },
	});

	return NextResponse.json(options);
}
