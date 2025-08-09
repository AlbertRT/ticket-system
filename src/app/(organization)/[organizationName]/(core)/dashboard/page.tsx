"use client";

import { getOrgDetails } from "@/action/organizer/get-details";
import { TriangleAlert } from "lucide-react";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { OrgDetails } from "@/types/type";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import DataCard from "@/components/Organizer/ui/dashboard/data-card";

export default function page() {
	const pathname = usePathname().split("/")[1];
	const [details, setDetails] = useState<OrgDetails | null>(null);

	useEffect(() => {
		(async () => {
			const data = await getOrgDetails(pathname);
			setDetails(data);
		})();
	}, []);

	if (!details) {
		return <LoadingOverlay fullscreen />;
	}

	return (
		<div className="">
			<h1 className="text-3xl font-light">Selamat Pagi!</h1>
			{!details.is_verified && (
				<Alert variant={"default"} className="my-4">
					<TriangleAlert />
					<AlertTitle>
						Eh, organisasi kamu belum verified 😬
					</AlertTitle>
					<AlertDescription className="flex items-center">
						Coba verifikasi dulu biar bisa pake semua fitur keren{" "}
						<Link href={`verifikasi`} className="hover:underline text-blue-400">
							di sini!
						</Link>
					</AlertDescription>
				</Alert>
			)}
            <div className="grid grid-cols-3 gap-5 mt-4">
                <DataCard title="Event Aktif" suffix="Event" />
                <DataCard title="Tiket Terjual" suffix="Tiket" />
                <DataCard title="Total Pengunjung" suffix="Orang" />
                <DataCard title="Keuntungan" isCurrency />
                <DataCard title="Keuntungan Perbulan" isCurrency />
                <DataCard title="Total Pengikut" />
            </div>
		</div>
	);
}
