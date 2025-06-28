'use server'
import {OrganizationSchema, RegisterSchema, SignInSchema} from "@/lib/zod";
import { hashSync } from 'bcrypt'
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import {auth, signIn} from "@/auth";
import { AuthError } from "next-auth";
import { use } from "react";

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


// orgranization action
export const OrganizationAction = async (_prevState: unknown, formData: FormData) => {
    const validateFields = OrganizationSchema.safeParse(Object.fromEntries(formData.entries()))
    const session = await auth()

    if (!session) {
        return { error: { general: 'Silakan masuk terlebih dahulu.' } }
    }

    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors
        }
    }

    const { organizer, description, location } = validateFields.data

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: session.user.id as string
            }
        })

        if (!user) {
            return { error: { general: 'User tidak ditemukan, silakan masuk terlebih dahulu.' } }
        }

        await prisma.user.update({
            where: {
                id: user.id as string
            },
            data: {
                role: 'ORGANIZER',
            }
        })

        await prisma.organization.create({
            data: {
                name: organizer,
                description,
                location,
                userId: user.id as string,
                joined_at: new Date(),
            }
        })  

        await prisma.notification.create({
			data: {
				userId: user.id as string,
				title: "Welcome to the Squad! 🤝",
				description: `Kamu udah masuk ke dunia organizer Tiketen. Yuk tunjukkin kreativitas kamu dengan event pertama yang epic!`,
				detail: "INFO",
				is_readed: false,
			},
		});
    } catch (error) {
        console.log(error)
        return { error: { general: 'Gagal membuat organisasi, coba lagi nanti.' } }
    }

    redirect('/user')
}