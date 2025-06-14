import { type DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession;
    }

    interface User {
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        sub: string
        role: string
    }
}