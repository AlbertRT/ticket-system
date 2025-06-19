"use server"

import { prisma } from "@/lib/prisma"

export const GetNotification = async (userId: string) => {
    if (!userId) {
        return []
    }

    try {
        const data = await prisma.notification.findMany({
            where: {
                userId
            }
        })
        return data || []
    } catch (error) {
        console.error('Error fetching notifications:', error)
        return []
    }
}