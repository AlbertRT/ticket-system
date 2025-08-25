import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MembershipRules } from "@/types/type";
import React from "react";

export default function MembershipTierList({
	rule,
}: {
	rule: MembershipRules;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="min-w-[220px] cursor-pointer rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-lg flex-shrink-0">
					{/* Tier Name */}
					<p className="font-bold text-lg uppercase flex items-center gap-2">
						<span
							className={cn(
								"w-3 h-3 rounded-full",
								rule.tier.includes("BASIC") && "bg-gray-400",
								rule.tier.includes("PLATINUM") && "bg-blue-500",
								rule.tier.includes("SIGNATURE") &&
									"bg-purple-500",
								rule.tier.includes("INFINITE") && "bg-black",
								rule.tier.includes("WORLD") && "bg-yellow-500"
							)}
						/>
						{rule.tier.replace("_", " ")}
					</p>

					{/* Earning Rate */}
					<p className="mt-1 text-sm text-gray-600">
						Earning Rate:{" "}
						<span className="font-semibold text-blue-600">
							1 poin / Rp
							{rule.earningRate.toLocaleString("id-ID")}
						</span>
					</p>

					<p className="mt-2 text-xs text-blue-500 underline">
						Lihat detail →
					</p>
				</div>
			</DialogTrigger>

			{/* Modal Content */}
			<DialogContent className="max-w-md rounded-2xl shadow-xl">
				<DialogHeader>
					<DialogTitle className="uppercase flex items-center gap-2">
						<span
							className={cn(
								"w-4 h-4 rounded-full",
								rule.tier.includes("BASIC") && "bg-gray-400",
								rule.tier.includes("PLATINUM") && "bg-blue-500",
								rule.tier.includes("SIGNATURE") &&
									"bg-purple-500",
								rule.tier.includes("INFINITE") && "bg-black",
								rule.tier.includes("WORLD") && "bg-yellow-500"
							)}
						/>
						{rule.tier.replace("_", " ")} Tier
					</DialogTitle>
					<DialogDescription>
						Detail perolehan poin, welcome bonus, serta keuntungan
						di tier ini.
					</DialogDescription>
				</DialogHeader>

				<div className="mt-4 space-y-5 text-sm">
					{/* Earning Rate */}
					<div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
						<p className="font-semibold text-blue-800">
							Earning Rate
						</p>
						<p className="text-blue-700">
							1 poin setiap Rp
							{rule.earningRate.toLocaleString("id-ID")}{" "}
							transaksi.
						</p>
					</div>

					{/* Welcome Bonus */}
					{rule.welcomeBonus && (
						<div className="rounded-lg bg-green-50 p-4 border border-green-200">
							<p className="font-semibold text-green-800">
								Welcome Bonus
							</p>
							<p className="text-green-700">
								+{rule.welcomeBonus} poin (setara Rp
								{(
									rule.welcomeBonus * rule.redeemRate
								).toLocaleString("id-ID")}
								)
							</p>
						</div>
					)}

					{/* Min & Max Point */}
					<div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
						<p className="font-semibold text-yellow-800">
							Batas Poin
						</p>
						<p className="text-yellow-700">
							Min: {rule.minPoints} poin <br />
							Max: {rule.maxPoints ? rule.maxPoints : "∞"} poin
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
