import { UserProfileMenu } from "@/types/type";

export const USER_SIDEBAR_MENU = [
    {
        title: "Akun",
        items: [
            {
                label: "Notifikasi",
                href: "/user/notifikasi"
            },
            {
                label: "Keamanan",
                href: "/user/keamanan"
            },
        ],
        role: ["USER", "ADMIN", "ORGANIZER"]
    },
    {
        title: "Pembelian",
        items: [
            {
                label: "Menunggu Pembayaran",
                href: "/user/transaksi/menunggu-pembayaran"
            },
            {
                label: "Riwayat Transaksi",
                href: "/user/transaksi/riwayat"
            }
        ],
        role: ["USER"]
    },
    {
        title: "Pengaturan",
        items: [
            {
                label: "Metode Pembayaran",
                href: "/user/metode-pembayaran"
            }
        ],
        role: ["USER"]
    },
    {
        title: "Admin",
        items: [
            {
                label: "Dashboard",
                href: "/admin/dashboard"
            },
            {
                label: "Kelola Pengguna",
                href: "/admin/pengguna"
            },
            {
                label: "Pengaturan Aplikasi",
                href: "/admin/event"
            },
        ],
        role: ["ADMIN"]
    },
    {
        title: "Organizer",
        items: [
            {
                label: "Dashboard",
                href: "/organizer/dashboard"
            },
            {
                label: "Kelola Event",
                href: "/organizer/event"
            },
            {
                label: "Kelola Kupon",
                href: "/organizer/kupon"
            },
            {
                label: "Pengaturan Akun",
                href: "/organizer/pengaturan"
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