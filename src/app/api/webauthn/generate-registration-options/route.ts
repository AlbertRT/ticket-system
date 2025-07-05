import { generateRegistrationOptions } from "@simplewebauthn/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: Request) {
	const session = await auth();
	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const cookie = await cookies();
	const device_token = cookie.get("device_token")?.value;
	if (!device_token) {
		return NextResponse.json(
			{ error: "Device token not found" },
			{ status: 400 }
		);
	}

	const device = await prisma.userDevice.findFirst({
		where: {
			userId: session.user.id,
			device_token: device_token,
		},
	});

	if (!device) {
		return NextResponse.json({ error: "Invalid device" }, { status: 404 });
	}

	const options = await generateRegistrationOptions({
		rpName: "Tiketen",
		rpID: process.env.NEXT_PUBLIC_DOMAIN!,
		userID: session.user.id!,
		userName: session.user.email!,
		attestationType: "none",
	});

	await prisma.credential.create({
		data: {
			userId: session.user.id as string,
			deviceId: device.id,
			challenge: options.challenge,
			publicKey: "",
			credentialID: "",
			counter: 0,
			transports: "",
		},
	});

	return NextResponse.json({
		...options,
	});
}
