import React from "react";

export default async function page() {
	return (
		<div className="w-[85%] space-y-6">
			<div>
				<h2 className="font-bold text-lg">Notif center</h2>
				<p className="text-muted-foreground text-sm">
					Kamu punya 0 notifikasi
				</p>
			</div>
			<div className="h-[80vh] max-h-full overflow-y-auto space-y-4">
				<p className="text-center text-gray-500">
					Tidak ada notifikasi
				</p>
			</div>
		</div>
	);
}
