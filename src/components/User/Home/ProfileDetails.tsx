"use client";
import { UserProfileMenu } from "@/types/type";
import React from "react";
import { UserProfileItem } from "./UserProfileItem";

interface ProfileDetailsProps {
	section: UserProfileMenu;
	user: {
		name?: string | null | undefined;
		id?: string | undefined;
		email?: string | null | undefined;
		emailVerified?: Date | null | undefined;
		image?: string | null | undefined;
		date_of_birth?: Date | null | undefined;
		phone_number?: string | null | undefined;
		created_at?: Date | undefined;
		is_member?: boolean | undefined;
	};
}

export default function ProfileDetails({ section, user }: ProfileDetailsProps) {
	function formatProfileValue(value: unknown): string | null | undefined {
		if (value == null) return null;

		if (value instanceof Date) {
			return value.toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "long",
				year: "numeric",
			});
		}

		if (typeof value === "boolean") {
			return value ? "Ya" : "Tidak";
		}

		if (typeof value === "string") {
			return value;
		}

		return String(value);
	}
	return (
		<div key={section.id} className="space-y-2">
			<h3 className="text-base font-semibold capitalize">
				{section.header}
			</h3>
			<ul className="divide-y rounded-lg border bg-white">
				{section.items.map((item, i) => (
					<UserProfileItem
						key={i}
						label={item.label}
						value={formatProfileValue(
							user?.[item.value as keyof typeof user]
						)}
						field={item.value}
						onSave={async (field, newValue) => {
                            await fetch("/api/user/update", {
								method: "POST",
								body: JSON.stringify({
									field,
									value: newValue,
									userId: user.id,
								}),
								headers: { "Content-Type": "application/json" },
							});
                        }}
					/>
				))}
			</ul>
		</div>
	);
}
