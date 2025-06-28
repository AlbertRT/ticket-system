"use server"

import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

export const getCurrentDevice = async (user_id: string) => {
    const cookie = await cookies()
    const device_token = cookie.get('device-token')?.value || ""
    
    if (!device_token) {
        return null
    }

    try {

        const current_device = await prisma.userDevice.findFirst({
            where: {
                userId: user_id,
                device_token
            },
            include: {
                Credential: true
            }
        })

        return {
            current_device
        }

    } catch(e) {
        console.log(e)
        return null
    }
}