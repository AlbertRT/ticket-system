import React from "react";

export default function DataCard({
	title,
	data = 0,
	suffix,
	isCurrency = false,
}: {
	title: string;
	data?: number;
	suffix?: string;
	isCurrency?: boolean;
}) {
	return (
		<div className="bg-white rounded-md p-5 h-[140px] w-full min-w-[300px] max-w-md">
			<p>{title}</p>
			<div className="mt-3 gap-4 flex items-end">
				<div className=" font-bold">
					<span className="text-3xl">{isCurrency && "Rp "}</span>
					<span className="text-5xl">{data}</span>
				</div>
				<span className="mr-4 text-muted-foreground">{suffix}</span>
			</div>
		</div>
	);
}
