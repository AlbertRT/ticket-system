import { MembershipRules, SidebarMenu, UserProfileMenu } from "@/types/type";
import { Bell, Cog, CreditCard, icons, Receipt, Shield } from "lucide-react";

export const USER_SIDEBAR_MENU: SidebarMenu[] = [
	{
		title: "Akun",
		items: [
			{
				label: "Notifikasi",
				href: "/notifikasi",
				icon: Bell,
			},
			{
				label: "Keamanan",
				href: "/keamanan",
                icon: Shield
			},
		],
		role: ["USER", "ADMIN", "ORGANIZER"],
	},
	{
		title: "Pembayaran",
		items: [
			{
				label: "Riwayat Transaksi",
				href: "/transaksi/riwayat",
                icon: Receipt
			},
			{
				label: "Kartu Pembayaran",
				href: "/kartu-pembayaran",
                icon: CreditCard
			},
		],
		role: ["USER"],
	},
	{
		title: "Pengaturan",
		items: [
			{
				label: "Pengaturan",
				href: "/pengaturan",
                icon: Cog
			},
		],
		role: ["USER"],
	},
	{
		title: "Admin",
		items: [
			{
				label: "Dashboard",
				href: "/dashboard",
			},
			{
				label: "Kelola Pengguna",
				href: "/pengguna",
			},
			{
				label: "Pengaturan Aplikasi",
				href: "/event",
			},
		],
		role: ["ADMIN"],
	},
	{
		title: "Organizer",
		items: [
			{
				label: "Dashboard",
				href: "/dashboard",
			},
			{
				label: "Kelola Event",
				href: "/event",
			},
			{
				label: "Kelola Kupon",
				href: "/kupon",
			},
			{
				label: "Pengaturan Akun",
				href: "/pengaturan",
			},
		],
		role: ["ORGANIZER"],
	},
];

export const USER_PROFILE_MENU: UserProfileMenu[] = [
    {
        id: "data-diri",
        header: "data diri",
        items: [
            {
                label: "Nama",
                value: "name"
            },
            {
                label: "Tanggal Lahir",
                value: "date_of_birth"
            }
        ]
    },
    {
        id: "informasi-kontak",
        header: "informasi kontak",
        items: [
            {
                label: "Email",
                value: "email"
            },
            {
                label: "Nomor Telepon",
                value: "phone_number"
            }
        ]
    },
]

export const ACCECPTED_PAYMENT_CARD = [{
    company: "American Express",
    logo: "american-express.png"
}, {
    company: "Visa",
    logo: "visa-original.png"
}, {
    company: "Mastercard",
    logo: "mastercard.png"
}, {
    company: "JCB",
    logo: "jcb.png"
}, {
    company: "Union Pay",
    logo: "unionpay.png"
}]

export const POINTS_RULES: MembershipRules[] = [
	{
		tier: "CLASSIC",
		earningRate: 50000,
		redeemRate: 100,
		minPoints: 0,
		maxPoints: 2499,
        nextTier: "PLATINUM",
        welcomeBonus: 500
	},
	{
		tier: "PLATINUM",
		earningRate: 30000,
		redeemRate: 100,
		minPoints: 2500,
		maxPoints: 9999,
        nextTier: "SIGNATURE"
	},
	{
		tier: "SIGNATURE",
		earningRate: 20000,
		redeemRate: 100,
		minPoints: 10000,
		maxPoints: 24999,
        nextTier: "INFINITE"
	},
	{
		tier: "INFINITE",
		earningRate: 10000,
		redeemRate: 100,
		minPoints: 25000,
		maxPoints: 49999,
        nextTier: "WORLD ELITE"
	},
	{
		tier: "WORLD ELITE",
		earningRate: 7500,
		redeemRate: 100,
		minPoints: 50000,
		maxPoints: null,
        nextTier: ""
	},
];
