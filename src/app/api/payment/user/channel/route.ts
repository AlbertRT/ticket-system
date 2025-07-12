import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
	const session = await auth();
	if (!session)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const userId = session.user.id as string;

	const cards = await prisma.userPaymentChannel.findMany({
		where: { userId },
		orderBy: { isPrimary: "desc" },
	});
	return NextResponse.json(cards);
}
