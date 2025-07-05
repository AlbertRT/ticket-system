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