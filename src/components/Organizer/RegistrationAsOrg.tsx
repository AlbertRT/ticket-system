'use client'

import React, { useActionState, useEffect } from "react";
import AuthButton from "../ui/auth-button";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { OrganizationAction } from "@/action/action";

export default function RegistrationAsOrg() {
	const [state, formAction] = useActionState(OrganizationAction, null);

	useEffect(() => {
		if (state?.error) {
			Object.entries(state.error).forEach(([field, message]) => {
				if (Array.isArray(message)) {
					message.forEach((msg) => toast.error(`${field}: ${msg}`));
				} else {
					toast.error(`${field}: ${message}`);
				}
			});
		}
	}, [state]);
	return (
		<form action={formAction}>
			<CardContent className="space-y-6 mb-5">
				<div className="space-y-4">
					<Label htmlFor="organizer">Nama organisasi mu.</Label>
					<Input type="text" name="organizer" className="mt-4" />
				</div>
				<div className="space-y-4">
					<Label htmlFor="description">
						Deksripsi singkat tentang organisasi mu.
					</Label>
					<Textarea id="description" className="mt-4" name="description" />
				</div>
				<div className="space-y-4">
					<Label htmlFor="location">
						Masukan lokasi dimana kamu berada.
					</Label>
					<Input id="location" className="mt-4" name="location" />
				</div>
			</CardContent>
			<CardFooter>
				<AuthButton text="Simpan dan lanjutkan" />
			</CardFooter>
		</form>
	);
}
