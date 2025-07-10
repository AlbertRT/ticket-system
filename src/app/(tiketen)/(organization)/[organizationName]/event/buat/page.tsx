import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InfoIcon } from "lucide-react";
import React from "react";

export default async function page() {
	return (
		<div className="flex justify-center min-h-screen px-4">
			<div className="w-full max-w-2xl">
				<div className="rounded-md border px-4 py-3 flex items-center">
					<InfoIcon
						className="me-3 -mt-0.5 inline-flex text-blue-500 w-6"
						size={16}
						aria-hidden="true"
					/>
					<div className="space-y-1">
						<p className="font-bold">
							Selamat bergabung sebagai Organizer! 🎉
						</p>
						<p className="text-sm">
							Yuk mulai langkah pertamamu dengan membuat event
							pertama! Kami siap bantu kamu wujudkan event yang
							keren.
						</p>
					</div>
				</div>

				<Card className="w-full mt-4">
					<div className="p-4">
						<h3 className="font-semibold text-lg">
							Formulir Event Baru
						</h3>
						<p className="text-sm text-muted-foreground">
							Lengkapi detail berikut untuk memulai dan
							mempublikasikan event kamu.
						</p>
					</div>
					<form>
						<div className="p-4 space-y-4">
							<div className="space-y-1">
								<label
									htmlFor="eventName"
									className="block text-sm font-medium text-gray-700"
								>
									Nama Event
								</label>
								<Input
									type="text"
									id="eventName"
									name="eventName"
									className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Masukkan nama event"
									required
								/>
							</div>
							<div className="space-y-1">
								<label
									htmlFor="eventDescription"
									className="block text-sm font-medium text-gray-700"
								>
									Deskripsi Event
								</label>
								<Textarea
									id="eventDescription"
									name="eventDescription"
									className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Masukkan deskripsi event"
									rows={4}
									required
								></Textarea>
							</div>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
}
