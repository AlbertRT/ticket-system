// components/User/Member/MemberDashboard.tsx
"use client";

import LoadingOverlay from "@/components/ui/loading-overlay";
import RegisterAsMemberModal from "@/components/User/Member/RegisterAsMemberModal";
import { POINTS_RULES } from "@/constatnt/constant";
import { cn } from "@/lib/utils";
import { useMember } from "@/app/hook/useUserMember";
import { MembershipRules } from "@/types/type";
import MembershipTierList from "./MembershipTierList";

interface Props {
	userId: string;
}

export default function MemberDashboard({ userId }: Props) {
	const { member, isLoading } = useMember(userId);

	if (isLoading) return <LoadingOverlay fullscreen />;

	const calculateMemberTierMaxPoint = () => {
		const currentTier = POINTS_RULES.find(
			(tier) => tier.tier === member?.tier
		);

		if (currentTier && member?.points) {
			return (currentTier.maxPoints ?? 0) - member.points;
		}
		return 0;
	};

	if (!member) {
		return (
			<div className="w-full">
				<div className="relative w-full rounded-2xl p-5 shadow-md flex h-[140px] flex-col items-center justify-center space-y-3 text-center">
					<p className="text-sm font-medium">
						Kamu belum bergabung sebagai member, yuk gabung sekarang
						untuk dapet benefit!
					</p>
					<RegisterAsMemberModal user_id={userId} />
				</div>
			</div>
		);
	}

	const currentTier: MembershipRules | undefined = POINTS_RULES.find((tier) => tier.tier === member?.tier);
    const maxPoints = currentTier?.maxPoints;

	// Hitung progress
	const progress =
		maxPoints === null || maxPoints === undefined
			? 1 // 100%
			: Math.min((member?.points ?? 0) / maxPoints, 1);

	return (
		<div className="w-full">
			<div
				className={cn(
					"relative w-full rounded-3xl p-6 text-white shadow-lg overflow-hidden",
					member?.tier.toLowerCase().replace("_", "-")
				)}
			>
				{/* Background Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10 backdrop-blur-md rounded-3xl" />

				{/* Card Content */}
				<div className="relative z-10 flex flex-col space-y-6">
					{/* Member Number & Tier */}
					<div className="flex items-center justify-between">
						<p className="text-xs font-mono tracking-widest opacity-80">
							{member?.member_name}
						</p>
						<span className="rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-wide">
							{member?.tier.replace("_", " ")}
						</span>
					</div>

					{/* Points */}
					<div className="flex flex-col items-center">
						<p className="text-5xl font-extrabold drop-shadow">
							{member?.points?.toLocaleString()}
						</p>
						<p className="text-sm font-medium opacity-80">
							T Points
						</p>
					</div>

					{/* Progress Ring */}
					{currentTier && (
						<div className="flex flex-col items-center space-y-3">
							<div className="relative h-24 w-24">
								<svg className="h-24 w-24 -rotate-90">
									<circle
										className="text-white/20"
										strokeWidth="6"
										stroke="currentColor"
										fill="transparent"
										r="44"
										cx="48"
										cy="48"
									/>
									<circle
										className="text-indigo-400"
										strokeWidth="6"
										stroke="url(#progressGradient)"
										fill="transparent"
										r="44"
										cx="48"
										cy="48"
										strokeDasharray={2 * Math.PI * 44}
										strokeDashoffset={
											2 * Math.PI * 44 * (1 - progress)
										}
										strokeLinecap="round"
									/>
									<defs>
										<linearGradient
											id="progressGradient"
											x1="0%"
											y1="0%"
											x2="100%"
											y2="0%"
										>
											<stop
												offset="0%"
												stopColor="#60a5fa"
											/>
											<stop
												offset="100%"
												stopColor="#c084fc"
											/>
										</linearGradient>
									</defs>
								</svg>

								<span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
									{(progress * 100).toFixed(0)}%
								</span>
							</div>
							<p className="text-xs text-center opacity-80">
								Kumpulkan {calculateMemberTierMaxPoint()} T
								Points lagi untuk naik ke{" "}
								{currentTier.nextTier ?? "tier berikutnya"}!
							</p>
						</div>
					)}

					{currentTier && (
						<div className="mt-4 text-xs space-y-1 opacity-80">
							<p>
								🎯 1 Point / Rp
								{currentTier.earningRate.toLocaleString()}
							</p>
							<p>
								💎 Rp{currentTier.redeemRate.toLocaleString()} /
								Point
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Tier List */}
			<div className="mt-8 space-y-4">
				<h3 className="text-base font-semibold">Tier List</h3>

				<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
					{POINTS_RULES.map((rule, index) => (
						<MembershipTierList rule={rule} key={index} />
					))}
				</div>
			</div>
		</div>
	);
}
