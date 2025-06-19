import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { isoBase64URL } from "@simplewebauthn/server/helpers";

export async function POST(req: Request) {
	const session = await auth();
    const cookie = await cookies()

	if (!session)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const body = await req.json();
	const expectedChallenge = cookie.get("biometric-challenge")?.value;
	if (!expectedChallenge)
		return NextResponse.json(
			{ error: "Missing challenge" },
			{ status: 400 }
		);

	const verification = await verifyRegistrationResponse({
		response: body,
		expectedChallenge,
		expectedOrigin: process.env.NEXT_PUBLIC_ORIGIN!,
		expectedRPID: process.env.NEXT_PUBLIC_DOMAIN!,
	});

	if (!verification.verified) {
		return NextResponse.json({ success: false });
	}

	const { credentialID, credentialPublicKey, counter } =
		verification.registrationInfo!;

	await prisma.credential.create({
		data: {
			userId: session.user.id!,
			credentialID: Buffer.from(credentialID).toString("base64"),
			publicKey: Buffer.from(credentialPublicKey).toString("base64"),
			challenge: expectedChallenge,
			counter,
		},
	});

	return NextResponse.json({ success: true });
}
