'use client'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RegisterCredentials } from "@/action/action"
import { toast } from "sonner"
import { useActionState } from "react"
import { useEffect } from "react"
import AuthButton from "@/components/ui/auth-button";
import {Separator} from "@/components/ui/separator";
import {AppleSignInButton, GoogleSignInButton} from "@/components/ui/social-buttons";

export default function RegisterCard() {
    const [state, formAction] = useActionState(RegisterCredentials, null)

    useEffect(() => {
        if (state?.error) {
            Object.entries(state.error).forEach(([field, message]) => {
                if (Array.isArray(message)) {
                    message.forEach((msg) => toast.error(`${field}: ${msg}`))
                } else {
                    toast.error(`${field}: ${message}`)
                }
            })
        }
    }, [state])

    return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Daftar akun baru</CardTitle>
				<CardDescription>
					Yay! kamu mau bergabung sama kita.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form action={formAction}>
					<div className="flex flex-col gap-6 mb-6">
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								name="name"
								type="text"
								placeholder="john.doe"
								autoComplete={"off"}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								autoComplete={"off"}
							/>
						</div>

						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<a
									href="#"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</a>
							</div>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder={"***"}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="confirm_password">
								Konfirmasi Password
							</Label>
							<Input
								id="confirm_password"
								name="confirm_password"
								type="password"
								placeholder="***"
							/>
						</div>
					</div>
					<AuthButton text={"Daftar akun baru"} />
				</form>
				<div className="mt-9 space-y-6">
					<div className="relative w-full flex items-center justify-center">
						<span className="absolute text-sm text-muted-foreground bg-white px-[4px] py-0.5">
							Masuk lebih cepat sekarang
						</span>
						<Separator />
					</div>
					<div className="flex justify-center gap-5 w-full ">
						<GoogleSignInButton />
						<AppleSignInButton />
					</div>
				</div>

				<CardAction className="w-full mt-6 flex items-center justify-center">
					<span>Sudah punya akun ya?</span>
					<Button variant="link" asChild>
						<Link href="/login">Masuk yuk!</Link>
					</Button>
				</CardAction>
			</CardContent>
		</Card>
	);
}
