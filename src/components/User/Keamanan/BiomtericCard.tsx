"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import React, { useState } from "react";

export default function BiomtericCard({
	biometric,
}: {
	biometric: {
		id: string;
		userId: string;
		is_active: boolean;
		challenge: string;
		deviceId: string | null;
		createdAt: Date;
        is_default: boolean
	};
}) {
	const [biometricActive, setBiometricActive] = useState(biometric.is_active);
	return (
		<Card>
			<CardHeader className="flex flex-col gap-2">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-4">
						<p className="font-medium">Biometrik</p>
						{biometric.is_default && <Badge>Utama</Badge>}
					</div>
					<Switch
						checked={biometricActive}
						onCheckedChange={setBiometricActive}
					/>
				</div>
				<p className="text-sm text-muted-foreground">
					{biometricActive
						? "Biometrik aktif digunakan untuk login & verifikasi."
						: "Biometrik belum diaktifkan."}
				</p>
				{biometricActive && (
					<p className="text-xs text-muted-foreground">
						Dibuat sejak{" "}
						{format(biometric.createdAt, "dd MMMM yyyy")}
					</p>
				)}
			</CardHeader>
		</Card>
	);
}
