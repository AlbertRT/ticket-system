import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    const { blocks } = await req.json();
    const session = await auth()

    if (!session) {
        return NextResponse.json({ msg: "Unauthorized" }, { status: 403 })
    }

    try {
        const user = await prisma.user.findFirst({ where: { id: session.user.id } })
        
        if (!user) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 })
        }

        if (user.default_verification === null) {
            await prisma.user.update({ where: { id: user.id } , data: { default_verification: "PIN" }})
        }

        await prisma.pinBlocks.create({
            data: {
                blocks,
                is_active: true,
                modifiedAt: new Date(),
                userId: user.id
            }
        })

        return NextResponse.json({ msg: "PIN created" }, { status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "server error" }, { status: 500 });
    }
}
