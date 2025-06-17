import { type DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession
    }
    
    interface User {
        role: string
        access_token?: string
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        sub: string,
        role: string
        access_token?: string
    }
}