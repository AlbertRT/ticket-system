"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { DynamicInput } from "./DynamicInput";

interface UserProfileItemProps {
	label: string;
	value: string | null | undefined;
	field: string;
	onSave: (field: string, value: string) => Promise<void> | void;
}

export function UserProfileItem({
	label,
	value,
	field,
    onSave
}:
UserProfileItemProps) {
	const displayValue = value || "-";

	const [open, setOpen] = useState(false);
	const [tempValue, setTempValue] = useState(value ?? "");
	const [loading, setLoading] = useState(false);

	const handleSave = async () => {
		setLoading(true);
		try {
			let newValueToSave: string | null = tempValue;

			if (field === "date_of_birth" && tempValue) {
				// Convert string ke Date
				const date = new Date(tempValue + "T00:00:00");
				newValueToSave = date.toISOString();
			}

			await onSave(field, newValueToSave);
			setOpen(false);
		} finally {
			setLoading(false);
		}
	};

	return (
		<li className="flex justify-between items-center py-3 border-b last:border-none px-6">
			<div className="flex flex-col">
				<span className="font-medium capitalize">{label}</span>
				<span className="text-sm text-muted-foreground">
					{displayValue}
				</span>
			</div>
			<Button
				variant="link"
				className="text-sm px-2"
				onClick={() => {
					setTempValue(value ?? "");
					setOpen(true);
				}}
			>
				Ubah
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Ubah {label}</DialogTitle>
					</DialogHeader>

					<DynamicInput field={field} value={tempValue} onChange={setTempValue} />

					<DialogFooter>
						<Button variant="ghost" onClick={() => setOpen(false)}>
							Batal
						</Button>
						<Button onClick={handleSave} disabled={loading}>
							{loading ? "Menyimpan..." : "Simpan"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</li>
	);
}
