"use server"

import {prisma} from "@/lib/prisma";
import {randomBytes} from "node:crypto";
import {parseUserDevice} from "@/lib/getDeviceInfo";

export async function syncDeviceInfo(access_token: string, user_id: string): Promise<string | null> {
    if (!access_token) return null

    if (!user_id) return null

    const { deviceName, userAgent } = await parseUserDevice()

    try {
        const device_token = randomBytes(32).toString("hex")

        await prisma.userDevice.create({
            data: {
                userId: user_id,
                device_token,
                device_name: deviceName,
                session_token: access_token,
                last_used_at: new Date(),
                user_agent: userAgent
            }
        })

        return device_token
    } catch (e) {
        console.error(e)
        return null
    }
}