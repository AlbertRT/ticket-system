'use server'
import {RegisterSchema, SignInSchema} from "@/lib/zod";
import { hashSync } from 'bcrypt'
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {signIn} from "@/auth";
import { AuthError } from "next-auth";

export const RegisterCredentials = async (_prevState: unknown, formData: FormData) => {
    const validateFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors
        }
    }

    const { name, email, password } = validateFields.data
    const hashedPassword = hashSync(password, 10)

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
    } catch (error) {
        console.log(error)
        return { error: { general: 'Gagal membuat akun, coba lagi nanti.' } }
    }

    redirect('/masuk')
}


// sign in credentials action

export const SignInCredentials = async (_prevState: unknown, formData: FormData) => {
    const validateFields = SignInSchema.safeParse(Object.fromEntries(formData.entries()))

    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors
        }
    }

    const { email, password } = validateFields.data

    try {
        await signIn("credentials", { email, password, redirectTo: "/" })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: error.message }
                default:
                    return {message: "Terjadi kesalahan" }
            }
        }

        throw error
    }
}

// google sign in

export const SignInGoogleAction = async () => {
    await signIn("google", { redirectTo: '/' });
}