"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function GetUserPaymentChannel() {
    const session = await auth()

    if (!session) {
        redirect('/')
    }

    try {
        const data = await prisma.userPaymentChannel.findMany({
            where: {
                userId: session.user.id as string
            },
            select: {
                id: true,
                card_expired: true,
                type: true,
                design: true,
                isActive: true,
                isPrimary: true,
                issuer_name: true,
                masked_number: true,
                scheme: true
            }
        })

        if (!data) {
            return null
        }

        return data
    } catch (error) {
        console.log(error)
        return null
    }

}