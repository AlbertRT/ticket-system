"use client"
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react'
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface DeviceProps {
	device: {
		id: string;
		session_token: string | null;
		created_at: Date;
		userId: string;
		device_name: string;
		user_agent: string;
		last_used_at: Date;
		device_token: string;
		is_active: boolean;
	};
}

function getDeviceIcon(deviceName: string) {
	const lower = deviceName.toLowerCase();

	if (
		lower.includes("windows") ||
		lower.includes("mac") ||
		lower.includes("linux")
	) {
		return <Laptop className="h-8 w-8" />;
	}

	if (lower.includes("android") || lower.includes("iphone")) {
		return <Smartphone className="h-8 w-8" />;
	}

	if (lower.includes("ipad")) {
		return <Tablet className="h-8 w-8" />;
	}

	return <Laptop className="h-8 w-8" />;
}

export default function DeviceCard({
	device,
}: DeviceProps) {

	return (
		<Card className="border">
			<CardHeader className="flex items-center justify-between">
				<span> Perangkat Saat ini</span>
				{device.is_active && <Badge>Aktif</Badge>}
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-4">
					<div className="w-[60px] h-[60px] border rounded-full flex items-center justify-center">
						{getDeviceIcon(device.device_name)}
					</div>
					<div>
						<p className="font-bold text-lg">
							{device.device_name}
						</p>
						<p className="text-sm text-muted-foreground">
							Terakhir di gunakan{" "}
							{format(device.last_used_at, "dd MMMM yyyy")}
						</p>
					</div>
				</div>
				<CardFooter className="flex justify-end items-center">
					<Button asChild variant={'link'}>
						<Link
							href={"/user/perangkat"}
							className="cursor-pointer"
						>
							Histori
						</Link>
					</Button>
				</CardFooter>
			</CardContent>
		</Card>
	);
}
