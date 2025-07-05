"use client";

import { Notification } from "@prisma/client";
import React from "react";
import { DropdownMenuItem } from "./dropdown-menu";
import clsx from "clsx";
import { BellIcon, Info } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { readNotification } from "@/lib/helper/readNotifcation";

export default function NotifcationItem({ data }: { data: Notification }) {
	return (
		<DropdownMenuItem
			key={data.id}
			className={clsx(!data.is_readed && "bg-gray-100 cursor-pointer")}
			onClick={() => !data.is_readed && readNotification(data.id)}
		>
			<div className="w-full space-y-3">
				{data.detail === "INFO" ? (
					<div className="flex items-center space-x-3">
						<Info className="w-5 h-5 text-blue-500" />
						<span className="text-xs text-muted-foreground">
							{formatDistanceToNow(data.created_at, {
								addSuffix: true,
								locale: id,
							})}
						</span>
					</div>
				) : (
					<div className="flex items-center space-x-3">
						<BellIcon className="w-5 h-5 text-gray-500" />
						<span className="text-xs text-muted-foreground">
							{formatDistanceToNow(data.created_at, {
								addSuffix: true,
								locale: id,
							})}
						</span>
					</div>
				)}
				<div className="space-y-1">
					<p className="font-semibold">{data.title}</p>
					<p className="text-sm text-muted-foreground">
						{data.description}
					</p>
				</div>
			</div>
		</DropdownMenuItem>
	);
}
