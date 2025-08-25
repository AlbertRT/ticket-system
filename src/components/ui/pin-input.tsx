"use client";

import { useState, useRef } from "react";

interface PinInputProps {
	length?: number; // default 6
	onComplete?: (value: string) => void;
	value?: string;
	onChange?: (value: string) => void;
}

export function PinInput({
	length = 6,
	onComplete,
	value = "",
	onChange,
}: PinInputProps) {
	const [internalValue, setInternalValue] = useState(value);
	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

	const handleChange = (index: number, val: string) => {
		if (!/^\d*$/.test(val)) return; // hanya angka
		let newValue = internalValue.split("");
		newValue[index] = val;
		const joined = newValue.join("");
		setInternalValue(joined);
		onChange?.(joined);

		// auto focus next
		if (val && index < length - 1) {
			inputsRef.current[index + 1]?.focus();
		}

		// trigger onComplete kalau sudah full
		if (joined.length === length && !joined.includes("")) {
			onComplete?.(joined);
		}
	};

	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !internalValue[index] && index > 0) {
			inputsRef.current[index - 1]?.focus();
		}
	};

	return (
		<div className="flex justify-center space-x-2">
			{Array.from({ length }).map((_, i) => (
				<input
					key={i}
					type="password"
					maxLength={1}
					value={internalValue[i] || ""}
					onChange={(e) => handleChange(i, e.target.value)}
					onKeyDown={(e) => handleKeyDown(i, e)}
					ref={(el) => {
						inputsRef.current[i] = el;
					}}
					className="w-10 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			))}
		</div>
	);
}
