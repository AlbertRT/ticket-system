"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"


export async function MakePrimary(id: string) {
    const session = await auth()

    if (!session) {
        redirect('/')
    }

    if (!id) {
        throw new Error("missiong required params id.")
    }

    try {

        const userId = session.user.id as string;
        
        await prisma.userPaymentChannel.updateMany({
			where: {
				userId,
				isPrimary: true,
			},
			data: {
				isPrimary: false,
			},
		});

		await prisma.userPaymentChannel.update({
			where: {
				id,
			},
			data: {
				isPrimary: true,
			},
		});

    } catch(error) {
        console.error(error)
        throw new Error("terjadi kesalahan")
    }
}