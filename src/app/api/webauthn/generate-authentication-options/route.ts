// app/api/auth/webauthn/generate-authentication-options/route.ts
import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	const { user_id } = await req.json();

	const user = await prisma.user.findFirst({
		where: {
			id: user_id
		},
		include: { credentials: true },
	});

	if (!user)
		return NextResponse.json({ error: "No user found" }, { status: 400 });

	const options = await generateAuthenticationOptions({
		allowCredentials: user.credentials.map((cred) => ({
			id: Buffer.from(cred.credentialID, "base64url"),
			type: "public-key",
		})),
		userVerification: "preferred",
		rpID: process.env.NEXT_PUBLIC_DOMAIN!,
	});

	const cookiesTransport = await cookies();
	cookiesTransport.set("biometric-challenge", options.challenge);

	await prisma.credential.update({
		where: { userId: user.id },
		data: { challenge: options.challenge }, // atau ke table Credential juga bisa
	});

	return NextResponse.json(options);
}
