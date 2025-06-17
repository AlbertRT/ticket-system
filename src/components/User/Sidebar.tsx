import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {auth} from "@/auth";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import LogoutButton from "@/components/User/LogoutBtn";

export const UserSidebar = async () => {
    const session = await auth()

    return <Card className="w-[258px]">
        <CardHeader>
            <div className="flex items-center gap-4 cursor-pointer font-bold">
                <Avatar>
                    <AvatarImage src={session?.user.image || "/avatar.png"} />
                </Avatar>
                <span>{session?.user.name}</span>
            </div>
        </CardHeader>
        <Separator/>
        <div className="w-full px-5">
            <span className="font-bold select-none">Akun</span>
            <ul className="text-sm mt-4 w-full">
                <li className="h-[30px] flex items-center hover:bg-gray-100 rounded">
                    <Link href="/user/notifikasi" className="w-full px-5">Notifikasi</Link>
                </li>
            </ul>
        </div>
        <div className="w-full px-5">
            <span className="font-bold select-none">Pembelian</span>
            <ul className="text-sm mt-4 w-full">
                <li className="h-[30px] flex items-center hover:bg-gray-100 rounded">
                    <Link href="/user/transaksi/menunggu-pembayaran" className="w-full px-5">Menuggu Pembayaran</Link>
                </li>
                <li className="h-[30px] flex items-center hover:bg-gray-100 rounded">
                    <Link href="/user/transaksi/riwayat" className="w-full px-5">Riwayat Transaksi</Link>
                </li>
            </ul>
        </div>
        <Separator/>
        <CardFooter>
            <LogoutButton />
        </CardFooter>
    </Card>
}