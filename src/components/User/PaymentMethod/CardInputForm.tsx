"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { validateCardNumberByBrand } from "@/lib/payment/brand-validator";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface CardFormValues {
	number: string;
	expiry: string;
	cvv: string;
}

interface Props {
	value: CardFormValues;
	onChange: (value: CardFormValues) => void;
	onSubmit?: () => void;
	submitLabel?: string;
    loading?: boolean;
}

export function CardInputForm({
	value,
	onChange,
	onSubmit,
	submitLabel = "Simpan Kartu",
    loading = false,
}: Props) {
	const expiryRef = useRef<HTMLInputElement>(null);
	const cvvRef = useRef<HTMLInputElement>(null);
    const [isCardValid, setIsCardValid] = useState(true);

	const [brand, setBrand] = useState("unknown");

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value.replace(/\D/g, "").slice(0, 19);
		const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
		onChange({ ...value, number: raw });

		const result = validateCardNumberByBrand(raw);
		setBrand(result.brand);
		setIsCardValid(result.valid);

		// Jika kartu valid, pindah ke expiry
		if (result.valid) {
			setTimeout(() => {
				expiryRef.current?.focus();
			}, 0);
		}
	};

	const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
			.replace(/\D/g, "")
			.slice(0, 4)
			.replace(/(\d{2})(\d{1,2})/, "$1/$2");

		onChange({ ...value, expiry: val });

		if (val.length === 5) {
			setTimeout(() => {
				cvvRef.current?.focus();
			}, 0);
		}
	};

	const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value.replace(/\D/g, "*").slice(0, 4);
		onChange({ ...value, cvv: raw });
	};

	return (
		<div className="space-y-5">
			<div className="space-y-2">
				<Label htmlFor="number">Nomor Kartu</Label>
				<div className="relative flex items-center">
					<Input
						placeholder="1234 1234 1234 1234"
						id="number"
						className={cn(
							"h-[45px] pr-12",
							!isCardValid &&
								value.number.length > 0 &&
								"border-red-500"
						)}
						value={value.number.replace(/(.{4})/g, "$1 ").trim()}
						onChange={handleNumberChange}
						inputMode="numeric"
						autoFocus
					/>
					<Image
						src={
							value.number.length === 0 || brand === "unknown"
								? "/logo/card/default-card.png"
								: `/logo/card/${brand
										.toLowerCase()
										.replace(" ", "-")}.png`
						}
						width={30}
						height={30}
						alt={brand}
						className="absolute right-[20px] bg-white rounded border p-1 transition-all duration-150 ease-in-out"
					/>
				</div>
				{!isCardValid && value.number.length > 0 && (
                    <p className="text-red-500 text-xs">Nomor kartu tidak valid.</p>)}
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="expires">Expires</Label>
					<Input
						placeholder="MM/YY"
						id="expires"
						ref={expiryRef}
						value={value.expiry}
						onChange={handleExpiryChange}
						inputMode="numeric"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="cvv">CVV</Label>
					<Input
						placeholder="***"
						id="cvv"
						ref={cvvRef}
						value={value.cvv}
						onChange={handleCVVChange}
						inputMode="numeric"
					/>
				</div>
			</div>

			{onSubmit && (
				<Button
					className="w-full mt-4 cursor-pointer"
					onClick={onSubmit}
					disabled={!isCardValid || value.number.length === 0 || loading}
				>
					{loading ? <LoaderCircle className="animate-spin" /> : submitLabel}
				</Button>
			)}
		</div>
	);
}
