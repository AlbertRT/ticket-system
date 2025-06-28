import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {auth} from "@/auth";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import LogoutButton from "@/components/User/LogoutBtn";
import { USER_SIDEBAR_MENU } from "@/constatnt/constant";
import { log } from "console";

export const UserSidebar = async () => {
    const session = await auth()
    return (
		<Card className="w-[258px]">
			<CardHeader>
				<div className="flex items-center gap-4 cursor-pointer font-bold">
					<Avatar>
						<AvatarImage
							src={session?.user.image || "/avatar.png"}
						/>
					</Avatar>
					<span>{session?.user.name}</span>
				</div>
			</CardHeader>
			<Separator />
			{session?.user?.role &&
				USER_SIDEBAR_MENU.filter((menu) => {
					if (Array.isArray(menu.role)) {
						return menu.role.includes(session.user.role);
					}
					return menu.role === session.user.role;
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
										href={item.href}
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
				<LogoutButton />
			</CardFooter>
		</Card>
	);
}