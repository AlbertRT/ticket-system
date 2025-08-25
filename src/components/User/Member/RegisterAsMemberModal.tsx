"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { useMember } from "@/app/hook/useUserMember";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function RegisterAsMemberModal({
	user_id,
}: {
	user_id: string;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const { mutateMember } = useMember(user_id);
    const [name, setName] = useState<string>("")
    const [referal_code, setReferalCode] = useState<string>("")

	const joinNow = async () => {
		const res = await fetch("/api/member/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_id, referal_code, member_name: name }),
		});

		if (res.ok) {
			await mutateMember(); // ⬅️ langsung refresh SWR
			setIsOpen(false);
		} else {
			console.error("Gagal join member");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="cursor-pointer">Gabung sekarang!</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Bergabung sebagai Member?</DialogTitle>
				</DialogHeader>
				<p>Ayo, coba gabung dengan member di Tiketen. </p>
                <div className="my-5 space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="nama">Nama</Label>
                        <Input id="nama" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="referal_code">Referal Code (Optional)</Label>
                        <Input id="referal_code" placeholder="Optional" value={referal_code} onChange={(e) => setReferalCode(e.target.value)} />
                    </div>
                </div>
				<DialogFooter>
					<Button className="w-full" onClick={joinNow}>
						Dapatkan 100 T POINTS!
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
