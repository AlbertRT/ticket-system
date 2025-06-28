import { auth } from "@/auth";
import RegistrationAsOrg from "@/components/Organizer/RegistrationAsOrg";
import AuthButton from "@/components/ui/auth-button";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
