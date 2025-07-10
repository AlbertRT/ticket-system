import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
	const body = await req.json();

	const { id, rawId, response, type } = body;

	if (type !== "public-key") {
		return NextResponse.json(
			{ error: "Invalid authentication response type" },
			{ status: 400 }
		);
	}

	if (!id || !response) {
		return NextResponse.json(
			{ error: "Missing credential ID or response" },
			{ status: 400 }
		);
	}

	// Cari user dan credential berdasarkan credential ID
	const credential = await prisma.credential.findUnique({
		where: {
			credentialID: id,
		},
	});

	if (!credential) {
		return NextResponse.json(
			{ error: "Credential not found" },
			{ status: 404 }
		);
	}

	const expectedOrigin = process.env.NEXT_PUBLIC_ORIGIN!; // misal: http://localhost:3000
	const expectedRPID = process.env.NEXT_PUBLIC_DOMAIN!; // misal: localhost

	let verification;
	try {
		verification = await verifyAuthenticationResponse({
			response: body,
			expectedChallenge: credential.challenge,
			expectedOrigin,
			expectedRPID,
			authenticator: {
				credentialID: isoBase64URL.toBuffer(credential.credentialID),
				credentialPublicKey: Buffer.from(
					credential.publicKey,
					"base64"
				),
				counter: credential.counter,
			},
		});
	} catch (error) {
		console.error("Auth verify error", error);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 400 }
		);
	}

	const { verified, authenticationInfo } = verification;

	if (!verified) {
		return NextResponse.json({ error: "Not verified" }, { status: 401 });
	}

	// Update counter & return user
	await prisma.credential.update({
		where: { credentialID: id },
		data: {
			counter: authenticationInfo.newCounter,
		},
	});

	return NextResponse.json({
		verified: true,
		credential_id: credential.id,
	});
}
