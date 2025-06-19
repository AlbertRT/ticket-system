import { User } from "@prisma/client"

export type UserDevice = {
    id: string,
    user_id: string,
    device_name: string,
    last_used_at: Date,
    user: {
        name: string | null,
        image: string | null
    }
}

export type UserProfileMenu = {
    id: string,
    header: string,
    items: ProfileMenuItem[]
}

export type ProfileMenuItem = {
    label: string,
    value: keyof User
}