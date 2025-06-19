import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import { Button } from "./button";
import { GetNotification } from "@/action/get-notification";

export default async function NotificationMenu({
	user_id,
}: {
	user_id: string | undefined;
}) {
	const notifications = await GetNotification(user_id || "");
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size={"icon"}
					variant="ghost"
					className="cursor-pointer"
				>
					<BellIcon className="w-5 h-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-72">
				<DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{notifications.length > 0 ? (
					notifications.map((notification) => (
						<DropdownMenuItem key={notification.id}>
							{notification.title}
						</DropdownMenuItem>
					))
				) : (
					<DropdownMenuItem disabled>
						Tidak ada notifikasi
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
