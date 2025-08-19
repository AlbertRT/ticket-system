import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import Link from "next/link";
import LogoutButton from "@/components/User/LogoutBtn";
import { USER_SIDEBAR_MENU } from "@/constatnt/constant";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ChevronRight, Coins, LogOut } from "lucide-react";

export const UserSidebar = async () => {
	const session = await auth();

	if (!session) {
		return;
	}



	return (
		<div className="w-[290px] bg-white p-5 flex flex-col justify-between border-r space-y-6">
			<Link
				href={"/user"}
				className="border rounded-xl p-4 bg-muted/50 flex items-center gap-4 select-none cursor-pointer"
			>
				<div className="shrink-0">
					<Avatar>
						<AvatarImage src={session.user.image || "avatar.png"} />
					</Avatar>
				</div>
				<div className="flex flex-col">
					<p className="text-base font-bold">{session.user.name}</p>
					<p className="text-muted-foreground text-sm">
						{session.user.email}
					</p>
				</div>
			</Link>
			<Link
				href={"/user/member"}
				className="mb-5 w-full rounded-xl border bg-white/60 p-4 shadow-sm 
        group flex items-center justify-between hover:shadow-md hover:border-blue-300 
        transition-all duration-200"
			>
				{/* Title */}
				<div>
					<p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600">
						Membership
					</p>
					<p className="text-xs text-gray-500">
						Lihat benefit & tier Anda
					</p>
				</div>

				{/* Chevron */}
				<div
					className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 
        transition-all duration-200 text-gray-400"
				>
					<ChevronRight className="w-4 h-4" />
				</div>
			</Link>

			{/* Chevron */}
			<div
				className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 
        transition-all duration-200 text-gray-400"
			>
				<ChevronRight className="w-4 h-4" />
			</div>

			<div className="flex-1 overflow-y-auto space-y-6">
				{session?.user?.role &&
					USER_SIDEBAR_MENU.filter((menu) =>
						Array.isArray(menu.role)
							? menu.role.includes(session.user.role)
							: menu.role === session.user.role
					).map((menu, index) => (
						<div key={index} className="space-y-2">
							<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-2 select-none">
								{menu.title}
							</span>
							<ul className="space-y-1">
								{menu.items.map((item, itemIndex) => (
									<li key={itemIndex}>
										<Link
											href={`/user${item.href}`}
											className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
										>
											{item.icon && (
												<item.icon className="w-4 h-4" />
											)}
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
			</div>

			<div className="space-y-4">
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="ghost"
							className="w-full flex items-center justify-start text-destructive font-semibold hover:bg-destructive hover:text-white transition cursor-pointer"
						>
							<LogOut className="h-4 w-4 mr-2" />
							Keluar
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Yakin mau keluar?</DialogTitle>
							<DialogDescription>
								Kamu akan keluar dari akun ini. Tapi tenang,
								semua data dan pengaturanmu tetap aman kok. ✌️
							</DialogDescription>
						</DialogHeader>
						<div className="flex items-center mt-6 gap-4 justify-end">
							<DialogClose asChild>
								<Button variant="outline" className="w-1/2">
									Batal
								</Button>
							</DialogClose>
							<LogoutButton />
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
