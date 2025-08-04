import { auth } from "@/auth";
import RegistrationAsOrg from "@/components/Organizer/RegistrationAsOrg";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
	const session = await auth();

	if (!session) {
		return redirect("/");
	}

	return (
		<div className="h-[75vh] w-full mx-auto flex items-center justify-center">
			<Card className="w-full max-w-2xl">
				<CardHeader>
					<CardTitle>
						Hai <b>{session.user.name}</b> 👋, yuk lengkapi data
						kamu dulu sebelum jadi bagian dari Tiketen Organizer.
					</CardTitle>
					<CardDescription>
						Nggak lama, kok! Cukup isi beberapa informasi biar kamu
						bisa langsung lanjut jadi Organizer di Tiketen.
					</CardDescription>
				</CardHeader>
				<RegistrationAsOrg />
			</Card>
		</div>
	);
}