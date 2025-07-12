import { $Enums, User } from "@prisma/client"

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

export type UserProfileMenu = {
    id: string,
    header: string,
    items: ProfileMenuItem[]
}

export type ProfileMenuItem = {
    label: string,
    value: keyof User
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
    masked: string,
    scheme: CardBrand,
    type: string | null,
    issuer_bank: string | null,
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
}