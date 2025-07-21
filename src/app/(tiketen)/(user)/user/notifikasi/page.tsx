import { GetNotification } from "@/action/get-notification";
import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Info, BellIcon } from "lucide-react";
import React from "react";

export default async function page() {
	const session = await auth();
    const notifications = await GetNotification(session?.user.id || "");
	return (
		<div className="w-[85%] space-y-6">
			<div>
				<h2 className="font-bold text-lg">Notif center</h2>
				{notifications.length > 0 && (
					<p className="text-muted-foreground text-sm">Kamu punya {notifications.length} notifikasi</p>
				)}
			</div>
			<div className="h-[80vh] max-h-full overflow-y-auto space-y-4">
				{notifications.length > 0 ? (
					notifications.map((notification) => (
						<div
							key={notification.id}
							className={clsx(notification.is_readed ? "hover:bg-gray-50 " : "bg-gray-100 border" , "rounded-xl cursor-pointer p-4 select-none ")}
						>
							<div className="flex items-center space-x-4 mb-4">
								{notification.detail === "INFO" ? (
									<Info className={clsx(notification.is_readed ? "text-blue-500" : "text-white", "w-5 h-5")} />
								) : (
									<BellIcon className="w-5 h-5 text-yellow-500" />
								)}
								<div>
									<p className="font-semibold">
										{notification.title}
									</p>
									<p className="text-xs text-gray-400">
										{formatDistanceToNow(
											new Date(notification.created_at),
											{
												addSuffix: true,
												locale: id,
											}
										)}
									</p>
								</div>
							</div>
							<p className="text-sm text-gray-500">
								{notification.description}
							</p>
						</div>
					))
				) : (
					<p className="text-center text-gray-500">
						Tidak ada notifikasi
					</p>
				)}
			</div>
		</div>
	);
}
