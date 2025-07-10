import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { UserPaymentChannel } from "@/types/type";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Banknote, Calendar, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BankCard({ channel }: { channel: UserPaymentChannel }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div
					className="w-full h-[50px] rounded cursor-pointer transition-colors hover:bg-gray-100 px-4 py-3 flex items-center justify-between mb-8"
					key={channel.id}
				>
					<div className="flex items-center gap-3">
						<Image
							src={`/logo/card/${channel.scheme?.toLowerCase()}.png`}
							alt={channel.scheme as string}
							width={40}
							height={40}
							className="g-white rounded border p-1"
						/>
						<p className="text-sm">
							{channel.scheme} {channel.masked_number}
						</p>
					</div>
					{channel.isPrimary && (
						<Badge className="rounded-full" variant={"secondary"}>
							Utama
						</Badge>
					)}
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="select-none flex gap-4 items-center">
						<span>Tentang Kartu {channel.masked_number}</span>
						{channel.isPrimary && (
							<Badge
								className="rounded-full"
								variant={"secondary"}
							>
								Utama
							</Badge>
						)}
					</DialogTitle>
				</DialogHeader>
				<div className="mt-4">
					<ul className="space-y-4">
						<li className="grid grid-cols-3 select-none text-sm">
							<div className="col-span-1 text-muted-foreground flex items-center gap-3">
								<Landmark
									className="bg-white rounded border p-1"
									size={25}
								/>
								<span>Nama Bank</span>
							</div>
							<div className="col-span-2 flex items-center justify-end">
								<Image
									src={`/logo/bank/${channel.issuer_name}.svg`}
									alt={channel.issuer_name as ""}
									width={100}
									height={50}
								/>
							</div>
						</li>
						<li className="grid grid-cols-3 select-none text-sm">
							<div className="col-span-1 text-muted-foreground flex items-center gap-3">
								<Banknote
									className="bg-white rounded border p-1"
									size={25}
								/>
								<span>Nomor Kartu</span>
							</div>
							<div className="col-span-2 flex items-center justify-end">
								<p className="font-bold">
									{channel.scheme} {channel.masked_number}
								</p>
							</div>
						</li>
						<li className="grid grid-cols-3 select-none text-sm">
							<div className="col-span-1 text-muted-foreground flex items-center gap-3">
								<Calendar
									className="bg-white rounded border p-1"
									size={25}
								/>
								<span>Tanggal Kadarluarsa</span>
							</div>
							<div className="col-span-2 flex items-center justify-end">
								<p className="font-bold">
									{channel.card_expired}
								</p>
							</div>
						</li>
					</ul>
				</div>
				<DialogFooter>
                    <Button variant={"outline"}>Jadikan pembayaran utama</Button>
					<Button>Hapus kartu</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
