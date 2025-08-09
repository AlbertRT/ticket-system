import { $Enums, OrgPaymentChannel, User } from "@prisma/client"
import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export type UserDevice = {
    id: string,
    user_id: string,
    device_name: string,
    last_used_at: Date,
    user: {
        name: string | null,
        image: string | null
    }
}

export type SidebarMenu = {
	title: string;
	items: {
		label: string;
		href: string;
		icon?: ForwardRefExoticComponent<
			Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
		>;
	}[];
	role: string[];
};

export type UserProfileMenu = {
    id: string,
    header: string,
    items: ProfileMenuItem[]
}

export type ProfileMenuItem = {
    label: string,
    value: keyof User,
}

export type OrganizationDetails = {
    id: string,
    name: string,
    description: string
    location: string
    url_name: string,
    created_at: Date
}

export type CardData = {
    number: string,
    expiry: string,
    cvv: string
}

export interface PaymentTokenResult {
    token_id: string
    token: string
    virtualCVV: string
    masked: string,
    scheme: CardBrand,
    type: string | null,
    issuer_bank: IssuerBankDetails | null,
    tier: string | null
}

export type CardBrand =
	| "Mastercard"
	| "Visa"
	| "American Express"
	| "JCB"
	| "UnionPay"
	| "Unknown";

export interface UserPaymentChannel {
    id: string,
    type: $Enums.PaymentCategory,
    design: string
    isActive: boolean,
    isPrimary: boolean,
    card_expired: string | null
    issuer_bank: string | null
    masked_number: string | null
    scheme: string | null
    tier: string | null
    logo: string | null
}

export type IssuerBank = {
    keywords: string[],
    details: IssuerBankDetails
}
export type IssuerBankDetails = {
	logo: string | null;
	company: string;
	name: string;
	alt: string;
	country: string;
};

export type OrgDetails = {
	id: string;
	is_verified: boolean;
	joined_at: Date;
	location: string;
	name: string;
	_count: {
		events: number;
	};
    url_name: string
};

export type ImgMetaData = {
    url_preview: string
    filename: string
}

export type KTPVerificationRes = {
	valid: boolean;
	nik_valid: boolean;
	nama_valid: boolean;
	tanggal_lahir_valid: boolean
};