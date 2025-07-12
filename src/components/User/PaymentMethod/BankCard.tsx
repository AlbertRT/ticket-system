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
import { Banknote, Calendar, CreditCard, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ISSUER_BANK_LOGO } from "@/constatnt/constant";
import { MakePrimary } from "@/action/paymet/make-primary";
import { toast } from "sonner";

export default function BankCard({
	channel,
	onUpdated,
}: {
	channel: UserPaymentChannel;
	onUpdated?: () => void;
}) {
	const issuer_bank_logo = ISSUER_BANK_LOGO[channel.issuer_bank as string];
	const handleMakePrimary = async () => {
		toast.promise(MakePrimary(channel.id), {
            loading: "Menjadikan kartu mu menjadi utama",
            success: (_) => {
                onUpdated?.();
                return 'Karu berhasil di jadikan pembayaran utama'
            },
            error: 'Kartu gagal dijadikan sebgagai pembayaran utama'
        })
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div
					className="w-full h-[50px] rounded cursor-pointer transition-colors hover:bg-gray-100 px-4 py-3 flex items-center justify-between mb-2"
					key={channel.id}
				>
					<div className="flex items-center gap-3">
						<Image
							src={`/logo/card/${channel.scheme
								?.toLowerCase()
								.replace(" ", "-")}.png`}
							alt={channel.scheme as string}
							width={30}
							height={30}
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
								{issuer_bank_logo ? (
									<Image
										src={`/logo/bank/${issuer_bank_logo}`}
										alt={channel.issuer_bank as ""}
										width={100}
										height={20}
										className="w-14"
									/>
								) : (
									<span>{channel.issuer_bank}</span>
								)}
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
						<li className="grid grid-cols-3 select-none text-sm">
							<div className="col-span-1 text-muted-foreground flex items-center gap-3">
								<CreditCard
									className="bg-white rounded border p-1"
									size={25}
								/>
								<span>Tipe</span>
							</div>
							<div className="col-span-2 flex items-center justify-end">
								<p className="font-bold">{channel.type}</p>
							</div>
						</li>
					</ul>
				</div>
				<DialogFooter>
					<Button
						variant={"outline"}
						disabled={channel.isPrimary}
						onClick={handleMakePrimary}
					>
						Jadikan pembayaran utama
					</Button>
					<Button>Hapus kartu</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
