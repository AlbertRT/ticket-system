import { generateRegistrationOptions } from "@simplewebauthn/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/auth";

export async function GET() {
	const session = await auth();
    const cookie = await cookies()

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const options = await generateRegistrationOptions({
		rpName: "Tiketen",
		rpID: process.env.NEXT_PUBLIC_DOMAIN!,
		userID: session.user.id!,
		userName: session.user.email!,
		attestationType: "none",
	});

	// Simpan challenge (sudah base64url-safe)
	cookie.set("biometric-challenge", options.challenge, {
		httpOnly: true,
		secure: true,
		path: "/",
		maxAge: 60,
	});

	return NextResponse.json(options);
}
