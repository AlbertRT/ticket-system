import { Loader2 } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
	fullscreen?: boolean;
}

export default function LoadingOverlay({
	fullscreen = false,
}: LoadingOverlayProps) {
	return (
		<div
			className={cn(
				"absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center transition-opacity",
				fullscreen ? "fixed" : "rounded-md"
			)}
		>
			<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
		</div>
	);
}
