import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import LogoutButton from "@/components/User/LogoutBtn";
import { USER_SIDEBAR_MENU } from "@/constatnt/constant";
import { getCurrentOrganization } from "@/action/get-user-details";
import SwitchUserButton from "./SwitchUserButton";
import { OrganizationDetails } from "@/types/type";
import { getBasePathForRole } from "@/lib/helper/getBasePathForRole";
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
import { LogOut } from "lucide-react";

export const UserSidebar = async ({
	Organization,
}: {
	Organization?: OrganizationDetails | undefined;
}) => {
	const session = await auth();
	const currentOrganizer = await getCurrentOrganization(
		session?.user?.id as string
	);

	if (!session) {
		return;
	}

	const basePath = getBasePathForRole(
		session.user.role,
		Organization?.url_name
	);

	const currentRole = (session?.user.role ?? "USER") as "USER" | "ORGANIZER";

	return (
		<Card className="w-[258px]">
			<CardHeader>
				<div className="flex items-center gap-4 select-none font-bold">
					<Avatar>
						<AvatarImage
							src={session?.user.image || "/avatar.png"}
						/>
					</Avatar>
					<div className="">
						<span>{session?.user.name}</span>
						<p className="text-xs text-gray-500">
							{session?.user.email}
						</p>
					</div>
				</div>
			</CardHeader>
			<Separator />
			{session?.user?.role &&
				USER_SIDEBAR_MENU.filter((menu) => {
					return Array.isArray(menu.role)
						? menu.role.includes(session.user.role)
						: menu.role === session.user.role;
				}).map((menu, index) => (
					<div key={index} className="w-full px-5">
						<span className="font-bold select-none">
							{menu.title}
						</span>
						<ul className="text-sm mt-4 w-full">
							{menu.items.map((item, itemIndex) => (
								<li
									key={itemIndex}
									className="h-[30px] flex items-center hover:bg-gray-100 rounded"
								>
									<Link
										href={`${basePath}${item.href}`}
										className="w-full px-5"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			<Separator />
			<CardFooter>
				<div className="space-y-4 w-full">
					{currentOrganizer && (
						<>
							<SwitchUserButton
								role={currentRole}
								userId={session.user.id as string}
							/>
							<Separator />
						</>
					)}
					<Dialog>
						<DialogTrigger asChild>
							<Button
								className="w-full cursor-pointer justify-between text-destructive font-bold hover:bg-destructive hover:text-white"
								variant={"ghost"}
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span className="w-full">Keluar</span>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Yakin mau keluar?</DialogTitle>
								<DialogDescription>
									Kamu akan keluar dari akun ini. Tapi tenang,
									data dan pengaturanmu tetap aman kok. ✌️
								</DialogDescription>
							</DialogHeader>
							<div className="flex items-center mt-7 justify-center w-full gap-4">
								<DialogClose asChild className="w-1/2">
									<Button variant={"outline"}>Batal</Button>
								</DialogClose>
								<LogoutButton />
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</CardFooter>
		</Card>
	);
};
