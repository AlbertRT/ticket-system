import { UserProfileMenu } from "@/types/type";

export const USER_SIDEBAR_MENU = [
    {
        title: "Akun",
        items: [
            {
                label: "Notifikasi",
                href: "/notifikasi"
            },
            {
                label: "Keamanan",
                href: "/keamanan"
            },
        ],
        role: ["USER", "ADMIN", "ORGANIZER"]
    },
    {
        title: "Pembelian",
        items: [
            {
                label: "Menunggu Pembayaran",
                href: "/transaksi/menunggu-pembayaran"
            },
            {
                label: "Riwayat Transaksi",
                href: "/transaksi/riwayat"
            }
        ],
        role: ["USER"]
    },
    {
        title: "Pengaturan",
        items: [
            {
                label: "Metode Pembayaran",
                href: "/metode-pembayaran"
            }
        ],
        role: ["USER"]
    },
    {
        title: "Admin",
        items: [
            {
                label: "Dashboard",
                href: "/dashboard"
            },
            {
                label: "Kelola Pengguna",
                href: "/pengguna"
            },
            {
                label: "Pengaturan Aplikasi",
                href: "/event"
            },
        ],
        role: ["ADMIN"]
    },
    {
        title: "Organizer",
        items: [
            {
                label: "Dashboard",
                href: "/dashboard"
            },
            {
                label: "Kelola Event",
                href: "/event"
            },
            {
                label: "Kelola Kupon",
                href: "/kupon"
            },
            {
                label: "Pengaturan Akun",
                href: "/pengaturan"
            }
        ],
        role: ["ORGANIZER"]
    }
]

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

export const ISSUER_BANK_LOGO: Record<string, string> = {
	"PT BANK CENTRAL ASIA": "bca.png",
	"PT BANK CENTRAL ASIA TBK": "bca.png",
	"P.T. BANK CIMB NIAGA TBK": "cimb.png",
	"PT BANK DANAMON LNDONESIA TBK": "danamon.png",
	"PT. BANK DBS INDONESIA": "dbs.png",
	"PT BANK DIGITAL BCA": "blu.png",
	"PT. BANK DJASA ARTA": "bsi.png",
	"PT BANK HSBC INDONESIA": "hsbc.png",
	"PT. BANK MANDIRI (PERSERO) TBK": "mandiri.png",
	"PT. BANK MAYBANK INDONESIA TBK": "maybank.png",
	"PT. BANK MEGA TBK": "mega.png",
	"PT. BANK NEGARA INDONESIA (PERSERO) TBK": "bni.png",
	"PT BANK OCBC NISP TBK": "ocbc.png",
	"PT. BANK PAN INDONESIA TBK": "panin.png",
	"PT. PAN INDONESIA BANK TBK. (PT. BANK PANIN TBK)": "panin.png",
	"PT. BANK PERMATA TBK": "permata.png",
	"PT. BANK RAKYAT INDONESIA (PERSERO)": "bri.png",
	"PT BANK UOB INDONESIA": "uob.png",
	"PT BANK SYARIAH INDONESIA TBK": "bsi.png",
	null: "default.png",
};

export const ACCECPTED_PAYMENT_CARD = [
    "AMERICAN EXPRESS", "JCB", "VISA", "MASTERCARD","UNIONPAY"
]