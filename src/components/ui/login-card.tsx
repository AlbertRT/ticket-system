'use client'

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import Link from "next/link"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {SignInCredentials} from "@/action/action"
import {toast} from "sonner"
import {useActionState} from "react"
import {useEffect} from "react"
import AuthButton from "@/components/ui/auth-button";
import {Separator} from "@/components/ui/separator";
import {GoogleSignInButton} from "@/components/ui/social-buttons";

export default function LoginCard() {
    const [state, formAction] = useActionState(SignInCredentials, null)

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
                <CardTitle>Login ke akun mu.</CardTitle>
                <CardDescription>
                    Kamu sudah punya akun kan? yuk masuk.
                </CardDescription>
                <CardAction>
                    <Button variant="link" asChild>
                        <Link href="/daftar">Belum punya akun?</Link>
                    </Button>
                </CardAction>
            </CardHeader>

            <CardContent>
                <form action={formAction}>
                    <div className="flex flex-col gap-6 mb-6">
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
                    </div>
                    <AuthButton text={"Masuk"}/>
                </form>

                <div className="mt-6 space-y-6">
                    <Separator/>
                    <GoogleSignInButton title="Lanjutkan dengan Google"/>
                </div>
            </CardContent>
        </Card>
    )
}
