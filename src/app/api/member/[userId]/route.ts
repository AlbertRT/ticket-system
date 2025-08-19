import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
	_: Request,
	{ params }: { params: { user_id: string } }
) {
	const member = await prisma.member.findFirst({
		where: { userId: params.user_id },
	});

	return NextResponse.json(member ?? null);
}
