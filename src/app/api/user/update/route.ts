import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
	const { field, value, userId } = await req.json();

	await prisma.user.update({
		where: { id: userId },
		data: { [field]: value },
	});

	return NextResponse.json({ success: true });
}
