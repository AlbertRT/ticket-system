"use server";

import { prisma } from "@/lib/prisma";
import { UserDevice } from "@/types/type";

export const GetDevice = async (
	device_token: string
): Promise<UserDevice | null> => {
	if (!device_token) {
		return null;
	}

	try {
		const result = await prisma.userDevice.findFirst({
			where: {
				device_token,
                is_active: true
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						image: true,
					},
				},
			},
		});

		if (!result) {
			return null;
		}

		return {
			id: result.id,
			user_id: result.userId,
			device_name: result.device_name,
			last_used_at: result.last_used_at,
			user: {
				name: result.user.name,
				image: result.user.image || null,
			},
		};
	} catch (error) {
		console.log(error);
		return null;
	}
};