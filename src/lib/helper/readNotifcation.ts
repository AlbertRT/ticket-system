"use server";

import { prisma } from "../prisma";

export async function readNotification(notificationId: string) {
	if (!notificationId) {
		return { error: "Notification ID is required" };
	}

	try {
		const notification = await prisma.notification.update({
			where: { id: notificationId },
			data: { is_readed: true },
		});

		return notification;
	} catch (error) {
		console.error("Error reading notification:", error);
		return { error: "Failed to read notification" };
	}
}
