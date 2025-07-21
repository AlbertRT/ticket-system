"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function onDelete(id: string) {
	const session = await auth();

	if (!session) {
		redirect("/");
	}

	if (!id) {
		throw new Error("missing required params id.");
	}

	try {
		await Promise.all([
			prisma.userPaymentChannel.delete({
				where: {
					id,
					userId: session.user.id as string,
				},
			}),
			await prisma.notification.create({
				data: {
					userId: session.user.id as string,
					title: "Byee kartu lama 👋",
					detail: "SUCCESS",
					description:
						"Metode pembayaran udah sukses dihapus. Jangan lupa tambahin yang baru ya!",
					is_readed: false,
				},
			}),
		]);
	} catch (error) {}
}
