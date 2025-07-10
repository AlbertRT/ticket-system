import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token_id, token, masked, scheme, type, issuer_name, expires } = await req.json();
    const session = await auth()

    if (!token_id || !token || !masked || !scheme) {
        return NextResponse.json(
			{ msg: "Missing required fields" },
			{ status: 400 }
		);
    }

    if (!session?.user) {
        return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    try {
        await Promise.all([
			prisma.userPaymentChannel.create({
				data: {
					userId: session.user.id as string,
					externalId: token_id,
					token,
					type: type.toUpperCase(),
					masked_number: masked,
					scheme,
					issuer_name,
					design: "default",
					isActive: true,
					isPrimary: false,
					card_expired: expires,
				},
			}),
            prisma.notification.create({
                data: {
                    userId: session.user.id as string,
                    title: "💳 Kartu kamu udah masuk~",
                    detail: "SUCCESS",
                    description: "Gass! Kartu kamu udah aman di sistem 😎",
                    is_readed: false,
                },
            })
		]);

        return NextResponse.json({ success: true, msg: "Kartu berhasil di tambah." }, { status: 200 })
    } catch (error) {
        console.error("Error saving payment method:", error);
        return NextResponse.json(
			{ msg: "Internal Server Error" },
			{ status: 500 }
		);
    }
}