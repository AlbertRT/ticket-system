"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentDevice } from "./get-device-details";
import { signIn, signOut } from "@/auth";

type SwitchUserProps = {
	userId: string;
	mode: "USER" | "ORGANIZER";
};

export const switchUser = async ({ userId, mode }: SwitchUserProps) => {
	const current_device = await getCurrentDevice(userId);

	if (!userId) {
		throw new Error("User ID is required");
	}

	if (!current_device) {
		throw new Error("Current device not found");
	}

	const current_user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			organizations: true,
		},
	});

	if (!current_user || !current_user.organizations) {
		throw new Error("User not found or does not have an organization");
	}

	let callbackUrl =
		mode === "ORGANIZER"
			? `/${current_user.organizations[0].name
					.toLowerCase()
					.replace(/\s+/g, "-")}/dashboard`
			: "/";

	try {
		await Promise.all([
			prisma.user.update({
				where: { id: userId },
				data: { role: mode },
			}),
			signOut({ redirect: false }),
			signIn("device-login", {
				device_id: current_device.current_device?.id,
				device_token: current_device.current_device?.device_token,
				callbackUrl,
			}),
		]);
	} catch (error) {
		console.error("Error switching user:", error);
		throw error;
	}
};
