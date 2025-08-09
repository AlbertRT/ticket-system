import { auth } from "@/auth"
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function PATCH(req: Request) {
    const { isValid } = await req.json()
    const session = await auth()

    if (!isValid) {
        return NextResponse.json({ msg: "Terjadi kesalahan" }, { status: 404 });
    }

    if (!session?.user) {
		return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
	}

    try {
        const org = await prisma.organization.findFirst({
            where: {
                userId: session.user.id,
                is_verified: false
            }
        })

        if (!org) {
            return NextResponse.json({ msg: "Organisasi tidak di temukan" }, { status: 404 });
        }

        await prisma.organization.update({
            where: {
                id: org.id
            },
            data: {
                is_verified: isValid
            }
        })

        return NextResponse.json({ msg: "Verifikasi berhasil" }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Internal server error" }, { status: 500 })
    }

}