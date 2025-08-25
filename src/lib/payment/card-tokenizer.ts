import crypto from "crypto-js";
import { CardBrand, CardData, PaymentTokenResult } from "@/types/type";
import { nanoid } from "nanoid";
import { getIssuerBankDetails } from "./get-issuerbank";

export function generateKey(userId: string, appSecret: string): string {
	return crypto
		.SHA256(userId + appSecret)
		.toString(crypto.enc.Hex)
		.slice(0, 32);
}

function encryptCardField(value: string, userId: string): string {
	const key = crypto.enc.Utf8.parse(userId.slice(0, 16)); // simple key (harus matching server)
	const iv = crypto.lib.WordArray.random(16);
	const encrypted = crypto.AES.encrypt(value, key, { iv }).toString();
	return iv.toString(crypto.enc.Hex) + ":" + encrypted;
}

export function getCardBrand(cardNumber: string): CardBrand  {
	const cleaned = cardNumber.replace(/\D/g, "");

	if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(cleaned)) return "Visa";
	if (
		/^(5[1-5][0-9]{14}|2(2[2-9][0-9]{12}|[3-6][0-9]{13}|7[01][0-9]{12}|720[0-9]{12}))$/.test(
			cleaned
		)
	)
		return "Mastercard";
	if (/^3[47][0-9]{13}$/.test(cleaned)) return "American Express";
	if (/^35(2[89]|[3-8][0-9])[0-9]{12,15}$/.test(cleaned)) return "JCB";
	if (/^62[0-9]{14,17}$/.test(cleaned)) return "UnionPay";
	return "Unknown";
}

export async function generateToken(
	card: CardData,
	userId: string,
): Promise<PaymentTokenResult> {
	const token_id = nanoid();

	const tokenizedNumber = encryptCardField(card.number, userId);
    const virtualCVV = crypto
		.HmacSHA256(card.cvv, userId + process.env.APP_SECRET)
		.toString();

	const last4 = card.number.slice(-4);
    const brand = getCardBrand(card.number);
    const lookup = await (
		await fetch(`https://data.handyapi.com/bin/${card.number.slice(0, 8)}`, {
            headers: { 'x-api-key': process.env.HANDY_API_KEY || '' },
        })
	).json();
    const details = getIssuerBankDetails(lookup.Issuer)
    

	return {
		token_id,
		token: tokenizedNumber,
        virtualCVV,
		masked: `**** ${last4}`,
		scheme: brand,
		type: lookup.Type || null,
		issuer_bank: details,
        tier: lookup.CardTier || "",
        logo: details?.logo ? details.logo : ""
	};
}