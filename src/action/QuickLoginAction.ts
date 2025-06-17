"use server"

import {prisma} from "@/lib/prisma";
import {UserDevice} from "@/types/type";

export const GetDevice = async (device_token: string): Promise<UserDevice | null> => {
    if (!device_token) {
        return null
    }

    try {
        const result = await prisma.userDevice.findFirst({
            where: {
                device_token
            }
        })

        if (!result) {
            return null
        }

        return {
            id: result.id,
            user_id: result.userId,
            device_name: result.device_name,
            last_used_at: result.last_used_at
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

// export const QuickLogin = async (device_token: string, user_id: string) => {
//     if (!device_token || !user_id) return false
//
//     try {
//         const device = await prisma.userDevice.findFirst({
//             where: { device_token: device_token, user_id: user_id }
//         })
//         if (!device) return false
//
//         await prisma.userDevice.update({
//             where: {
//                 device_token,
//                 userId: user_id
//             },
//             data: {
//                 last_used_at: new Date()
//             }
//         })
//
//         const sessionToken = signJWT
//     }
// }