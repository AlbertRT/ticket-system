"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import React, { useState } from "react";

export default function PinCard({
	pin,
}: {
	pin: {
		is_default: boolean;
		userId?: string | undefined;
		is_active?: boolean | undefined;
		createdAt?: Date | undefined;
	} | null;
}) {
	const [pinActive, setPinActive] = useState(pin ? pin.is_active : false);
	return (
		<Card>
			<CardHeader className="flex flex-col gap-2">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-4">
						<p className="font-medium">PIN</p>
						{pin && pin.is_default && <Badge>Utama</Badge>}
					</div>
					<Switch
						checked={pinActive}
						onCheckedChange={setPinActive}
					/>
				</div>
				<p className="text-sm text-muted-foreground">
					{pinActive
						? "PIN aktif digunakan sebagai metode cadangan."
						: "PIN belum diaktifkan."}
				</p>
				{pinActive && (
					<p className="text-xs text-muted-foreground">
						Dibuat sejak{" "}
						{pin?.createdAt &&
							format(pin.createdAt, "dd MMMM yyyy")}
					</p>
				)}
			</CardHeader>
		</Card>
	);
}
