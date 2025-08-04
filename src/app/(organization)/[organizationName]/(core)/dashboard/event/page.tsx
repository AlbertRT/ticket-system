import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
	return (
		<div className="space-y-4">
			<Link href={"event/buat-event"} className="mb-5">
				<Button className="cursor-pointer">
					<Plus />
					Buat Event Baru
				</Button>
			</Link>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>Nama</TableHead>
						<TableHead>Kapasitas</TableHead>
						<TableHead>Kapasitas Saat ini</TableHead>
						<TableHead>Tiket Terjual</TableHead>
						<TableHead>Berakhir dalam</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell colSpan={5} className="text-center">
							<span>Tidak ada event.</span>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
