'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { OrgDetails } from "@/types/type"
import { redirect } from "next/navigation"

export async function getOrgDetails(url_name: string): Promise<OrgDetails> {
    const session = await auth()

    if (!session) {
        redirect('/user')
    }

    try {
        const data = await prisma.organization.findFirst({
            where: {
                url_name
            },
            select: {
                id: true,
                is_verified: true,
                joined_at: true,
                location: true,
                name: true,
                _count: {
                    select: {
                        events: true,
                    }
                },
                url_name: true
            },
            
        })

        if (!data) {
            redirect('/user')
        }

        return data

    } catch (error) {
        throw Error(error as string)
    }

}