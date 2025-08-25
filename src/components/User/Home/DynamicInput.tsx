"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DynamicInputProps {
	field: string;
	value: string;
	onChange: (val: string) => void;
}

export function DynamicInput({ field, value, onChange }: DynamicInputProps) {
	const [confirmEmail, setConfirmEmail] = useState("");

	switch (field) {
		case "email":
			return (
				<div className="space-y-4">
					<div className="flex flex-col gap-2">
						<Label>Email</Label>
						<Input
							type="email"
							value={value}
							onChange={(e) => onChange(e.target.value)}
							placeholder="Masukkan email"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label>Konfirmasi Email</Label>
						<Input
							type="email"
							value={confirmEmail}
							onChange={(e) => setConfirmEmail(e.target.value)}
							placeholder="Ulangi email"
						/>
						{confirmEmail && confirmEmail !== value && (
							<span className="text-sm text-red-500">
								Email tidak sama
							</span>
						)}
					</div>
				</div>
			);

		case "phone_number":
			return (
				<div className="flex flex-col gap-2">
					<Label>Nomor HP</Label>
					<Input
						type="tel"
						value={value}
						onChange={(e) => {
							const val = e.target.value.replace(/[^0-9+]/g, ""); // hanya angka & +
							onChange(val);
						}}
						placeholder="+628123456789"
					/>
				</div>
			);

		case "date_of_birth":
			return (
				<div className="flex flex-col gap-2">
					<Label>Tanggal Lahir</Label>
					<Input
						type="date"
						value={value}
						onChange={(e) => onChange(e.target.value)}
					/>
				</div>
			);

		default:
			return (
				<div className="flex flex-col gap-2">
					<Label>{field}</Label>
					<Input
						value={value}
						onChange={(e) => onChange(e.target.value)}
						placeholder={`Masukkan ${field}`}
					/>
				</div>
			);
	}
}
