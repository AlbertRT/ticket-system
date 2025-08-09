import { useEffect, useState } from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
	text: string;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
	isLoading?: boolean;
	isSuccess?: boolean;
};

export function VerifyButton({
	text,
	disabled,
	className,
	onClick,
	isLoading,
	isSuccess,
}: Props) {
	const [state, setState] = useState<"default" | "loading" | "success">(
		"default"
	);

	useEffect(() => {
		if (isLoading) {
			setState("loading");
		} else if (isSuccess) {
			setState("success");
		} else {
			setState("default");
		}
	}, [isLoading, isSuccess]);

	return (
		<Button
			onClick={onClick}
			disabled={disabled || isLoading || isSuccess}
			className={cn(
				"relative flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium overflow-hidden h-10 w-48",
				className
			)}
		>
			<span
				className={cn(
					"absolute flex items-center gap-2 transition-all duration-300",
					state === "default"
						? "translate-y-0 opacity-100"
						: "translate-y-6 opacity-0"
				)}
			>
				{text}
			</span>

			<span
				className={cn(
					"absolute flex items-center gap-2 transition-all duration-300",
					state === "loading"
						? "translate-y-0 opacity-100"
						: "-translate-y-6 opacity-0"
				)}
			>
				<Loader2 className="animate-spin w-4 h-4" />
				Loading...
			</span>

			<span
				className={cn(
					"absolute flex items-center gap-2 transition-all duration-300",
					state === "success"
						? "translate-x-0 opacity-100"
						: "-translate-x-6 opacity-0"
				)}
			>
				<Check className="w-4 h-4" />
				Verifikasi Berhasil
			</span>
		</Button>
	);
}
