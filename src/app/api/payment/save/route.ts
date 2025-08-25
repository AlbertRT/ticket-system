import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto-js";
import { generateKey } from "@/lib/payment/card-tokenizer";

export async function POST(req: Request) {
    const { token_id, token, masked, scheme, type, issuer_bank, expires, tier, virtualCVV, logo } = await req.json();
    const session = await auth()

    console.log(token_id, token, masked, scheme, type, issuer_bank, expires, tier, virtualCVV)

    if (!token_id || !token || !masked || !scheme ||!issuer_bank || !expires || !virtualCVV) {
        return NextResponse.json(
			{ msg: "Missing required fields" },
			{ status: 400 }
		);
    }

    if (!session?.user) {
        return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const currentCardLen = await prisma.userPaymentChannel.findMany({
        where: {
            userId: session.user.id
        }
    })

    if (currentCardLen.length >= 4) {
        return NextResponse.json({ msg: "Kartu kamu sudah lebih dari 4" }, { status: 400 })
    }

    const biometric = await prisma.credential.findFirst({
        where: {
            userId: session.user.id
        }
    })
    
    if (!biometric) {
        return NextResponse.json({ msg: "Verifikasi biometric di perlukan" }, { status: 400 })
    }
    try {
        const payload = JSON.stringify({
            token,
            expires,
            virtualCVV,
            verification: {
                type: "biometric",
                value: biometric.credentialID
            }
        })

        const key = crypto.enc.Utf8.parse(
			generateKey(session.user.id as string, process.env.APP_SECRET || "")
		);
        const iv = crypto.lib.WordArray.random(16);
		const encrypted: string = crypto.AES.encrypt(payload, key, { iv }).toString();
		const data_token: string = iv.toString(crypto.enc.Hex) + ":" + encrypted;

        await Promise.all([
			prisma.userPaymentChannel.create({
				data: {
					userId: session.user.id as string,
					externalId: token_id,
					token: data_token,
					type: type.toUpperCase(),
					masked_number: masked,
					scheme,
					issuer_bank,
					design: "default",
					isActive: true,
					isPrimary: false,
                    tier,
					card_expired: expires,
                    logo
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
			}),
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