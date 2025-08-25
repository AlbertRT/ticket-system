import { prisma } from "@/lib/prisma";
import { customAlphabet, nanoid } from "nanoid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { user_id, member_name, referal_code } = await req.json()

    if (!user_id) {
		return NextResponse.json({ msg: "User id not provided" }, { status: 400 })
	}

	const user = await prisma.user.findFirst({
		where: {
			id: user_id,
			is_member: false,
		},
	});

	if (!user) {
		return NextResponse.json({ msg: "User is currently as a member" }, { status: 403 })
	}

    if (!member_name) {
        return NextResponse.json({ msg: "Member name is required"}, { status: 400 })
    }

	try {
		const member_number = customAlphabet("1234567890");

		await Promise.all([
			prisma.user.update({
				where: {
					id: user.id,
					is_member: false,
				},
				data: {
					is_member: true,
				},
			}),
			prisma.member.create({
				data: {
					id: nanoid(16),
					member_number: member_number(16),
					points: 100,
					userId: user.id,
                    member_name, 
                    referal_code
				},
			}),
		]);

        return NextResponse.json({ success: true }, { status: 201 })
	} catch (error) {
		console.log(error);
		return NextResponse.json({ msg: "Something wen't wrong" }, { status: 500 });
	}

}