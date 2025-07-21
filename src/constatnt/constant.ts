import { SidebarMenu, UserProfileMenu } from "@/types/type";
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

export const ACCECPTED_PAYMENT_CARD = [
    "AMERICAN EXPRESS", "JCB", "VISA", "MASTERCARD","UNIONPAY"
]
