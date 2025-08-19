"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { UserPaymentChannel } from "@/types/type";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
	Calendar,
	ChevronRight,
	CreditCard,
	Landmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MakePrimary } from "@/action/paymet/make-primary";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { InfoRow } from "./InfoRow";
import { onDelete } from "@/action/paymet/delete-card";
import { useState } from "react";

export default function BankCard({
	channel,
	onUpdated,
}: {
	channel: UserPaymentChannel;
	onUpdated?: () => void;
}) {
	const [isOpen, setOpen] = useState(false);

	const handleMakePrimary = async () => {
		toast.promise(MakePrimary(channel.id), {
			loading: "Menjadikan kartu mu menjadi utama",
			success: (_) => {
				onUpdated?.();
				return "Karu berhasil di jadikan pembayaran utama";
			},
			error: "Kartu gagal dijadikan sebgagai pembayaran utama",
		});
	};

	const handleDelete = async () => {
		toast.promise(onDelete(channel.id), {
			loading: "Kartu mu sedang di hapus",
			success: (_) => {
				onUpdated?.();
				setOpen(false);
				return "Kartu mu berhasil di hapus";
			},
			error: "Kartu gagal di hapus",
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div
					className="w-full h-[70px] rounded cursor-pointer transition-colors hover:bg-gray-100 px-4 py-3 flex items-center justify-between mb-2 border select-none"
					key={channel.id}
				>
					<div className="flex items-start flex-col">
						<div className="flex items-center gap-3">
							<Image
								src={`/logo/card/${channel.scheme
									?.toLowerCase()
									.replace(" ", "-")}.png`}
								alt={channel.scheme as string}
								width={25}
								height={0}
								className="bg-white border rounded"
							/>
							<p className="text-sm text-muted-foreground font-medium">
								{channel.scheme}
							</p>
						</div>
						<div className="px-[37px] grid grid-cols-2 gap-1">
							<div className="flex items-center gap-1">
								<p className="text-sm font-bold">
									{channel.issuer_bank}{" "}
									{channel.masked_number}
								</p>
								<Separator orientation="vertical" />
							</div>
							<div className="text-start">
								<p className="text-sm font-bold">
									{channel.card_expired}
								</p>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-3">
						{channel.isPrimary && (
							<Badge
								className="rounded-full"
								variant={"outline"}
							>
								Utama
							</Badge>
						)}
						<ChevronRight className="w-4" />
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className="select-none">
				<div className="space-y-6">
					<DialogHeader className="gap-0">
						<DialogTitle className="text-base font-semibold">
							Kartu {channel.masked_number}
						</DialogTitle>
						<DialogDescription>
							Detail metode pembayaran kamu
						</DialogDescription>
					</DialogHeader>

					<div className="border rounded-xl p-4 bg-muted/50 flex items-center gap-4">
						<div className="shrink-0">
							<Image
								src={`/logo/card/${channel.scheme
									?.toLowerCase()
									.replace(" ", "-")}.png`}
								alt={channel.scheme as string}
								width={35}
								height={0}
								className="bg-white border rounded"
							/>
						</div>
						<div className="flex flex-col">
							<p className="text-sm text-muted-foreground">
								{channel.scheme}
							</p>
							<p className="text-base font-bold">
								{channel.issuer_bank} {channel.masked_number}
							</p>
						</div>
					</div>

					{/* Info Blocks */}
					<div className="space-y-4 text-sm">
						<InfoRow
							icon={<Landmark size={18} />}
							label="Nama Bank"
							value={
								channel.logo ? (
									<Image
										src={`/logo/bank/${channel.logo}.png`}
										alt={channel.issuer_bank as string}
										width={64}
										height={20}
										className="object-contain"
									/>
								) : (
									channel.issuer_bank
								)
							}
						/>
						<InfoRow
							icon={<Calendar size={18} />}
							label="Kadaluarsa"
							value={channel.card_expired}
						/>
						<InfoRow
							icon={<CreditCard size={18} />}
							label="Tipe"
							value={channel.type}
						/>
					</div>

					{/* Footer Action */}
					<div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
						<Button
							variant="outline"
							disabled={channel.isPrimary}
							onClick={handleMakePrimary}
						>
							Jadikan utama
						</Button>
						<Button
							variant="destructive"
							onClick={handleDelete}
							className="cursor-pointer"
						>
							Hapus kartu
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
