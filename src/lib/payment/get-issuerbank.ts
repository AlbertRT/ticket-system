import { ISSUER_BANK } from "@/constatnt/issuer-bank";
import { IssuerBankDetails } from "@/types/type";

export function getIssuerBankDetails(
	bankName: string | null
): IssuerBankDetails | null {
	if (!bankName) return null;

	// normalisasi: uppercase, hapus karakter non-alfanumerik kecuali spasi
	const normalized = bankName
		.toUpperCase()
		.replace(/[^\p{L}\p{N}]+/gu, " ")
		.trim();

	let matched: IssuerBankDetails | null = null;
	let longestKeyword = 0;

	for (const bank of ISSUER_BANK) {
		for (const keyword of bank.keywords) {
			// normalisasi keyword juga
			const normKeyword = keyword
				.toUpperCase()
				.replace(/[^\p{L}\p{N}]+/gu, " ")
				.trim();

			// regex dengan word boundary
			const regex = new RegExp(`\\b${normKeyword}\\b`, "i");

			if (regex.test(normalized) && normKeyword.length > longestKeyword) {
				matched = bank.details;
				longestKeyword = normKeyword.length;
			}
		}
	}

	return matched;
}
