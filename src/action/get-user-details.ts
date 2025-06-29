"use server"

import { prisma } from "@/lib/prisma";

export const getUserDetails = async (user_id: string) => {
    if (!user_id) {
        throw new Error("User ID is required");
    }

    try {
        const user = await prisma.user.findUnique({
			where: { id: user_id },
			select: {
				id: true,
				name: true,
				email: true,
				emailVerified: true,
				image: true,
				phone_number: true,
				date_of_birth: true,
				created_at: true,
			},
		});

        return {
			...user,
		};
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
}