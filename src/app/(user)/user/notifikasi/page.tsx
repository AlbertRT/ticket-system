import { GetNotification } from "@/action/get-notification";
import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { Info, BellIcon } from "lucide-react";
import React from "react";

export default async function page() {
	const session = await auth();
    const notifications = await GetNotification(session?.user.id || "");
	return (
		<Card className="w-full max-w-2xl">
			<CardHeader>
				<CardTitle>Notif center</CardTitle>
				{notifications.length > 0 && (
					<CardDescription>
						Kamu punya {notifications.length} notifikasi
					</CardDescription>
				)}
			</CardHeader>
            <CardContent>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <div key={notification.id} className="p-4 select-none hover:bg-gray-50 rounded-md cursor-pointer">
                            <div className="flex items-center space-x-4 mb-4">
                                {notification.detail === "INFO" ? (
                                    <Info className="w-5 h-5 text-blue-500" />
                                ) : (
                                    <BellIcon className="w-5 h-5 text-yellow-500" />
                                )}
                                <div>
                                    <p className="font-semibold">{notification.title}</p>
                                    <p className="text-xs text-gray-400">
                                        {formatDistanceToNow(new Date(notification.created_at), {
                                            addSuffix: true,
                                            locale: id,
                                        })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">{notification.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">Tidak ada notifikasi</p>
                )}
            </CardContent>
		</Card>
	);
}
