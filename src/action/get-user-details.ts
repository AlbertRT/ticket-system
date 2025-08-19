"use server";

import { prisma } from "@/lib/prisma";
import { customAlphabet, nanoid } from "nanoid";

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
                is_member: true
			},
		});

		return {
			...user,
		};
	} catch (error) {
		console.error("Error fetching user details:", error);
		throw error;
	}
};

export const getCurrentOrganization = async (user_id: string) => {
	if (!user_id) {
		return null;
	}

	try {
		const organization = await prisma.organization.findFirst({
			where: {
				userId: user_id,
			},
			select: {
				id: true,
				name: true,
				description: true,
				location: true,
				url_name: true,
				created_at: true,
                is_verified: true
			},
		});

		return organization;
	} catch (error) {
		console.error("Error fetching organization details:", error);
		throw error;
	}
};

export const getMemberDetails = async (user_id: string) => {
    if (!user_id) {
		return null;
	}

    try {
        const member = await prisma.member.findUnique({
            where: {
                userId: user_id
            },
            select: {
                points: true,
                member_number: true,
                tier: true,
                joined_since: true
            }
        })

        return member
    }  catch (error) {
        console.log(error)
        throw error
    }
}