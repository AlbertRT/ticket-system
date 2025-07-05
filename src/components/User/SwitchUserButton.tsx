import React from 'react'

import { Button } from "@/components/ui/button";
import { switchUser } from '@/action/switch-user';

type SwitchUserButtonProps = {
    role: "ORGANIZER" | "USER";
    userId: string
}

export default function SwitchUserButton({ userId, role }: SwitchUserButtonProps) {
  return (
		<form action={async () => {
            "use server"
            await switchUser({
				userId,
				mode: role === "USER" ? "ORGANIZER" : "USER",
			});
        }}>
			<Button className="w-full cursor-pointer" variant={"secondary"}>
				Beralih ke akun{" "}
				{role === "USER" ? "Organizer" : "User"}
			</Button>
		</form>
  );
}
