import { ISSUER_BANK } from "@/constatnt/issuer-bank";
import { IssuerBankDetails } from "@/types/type";

export function getIssuerBankDetails(bankName: string | null): IssuerBankDetails | null  {
	if (!bankName) return null;

	const normalized = bankName.toUpperCase();

	for (const bank of ISSUER_BANK) {
		if (bank.keywords.some((keyword) => normalized.includes(keyword))) {
			return bank.details;
		}
	}

	return null;
}
