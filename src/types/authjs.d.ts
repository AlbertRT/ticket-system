import { type DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";

declare module "next-auth" {
    interface Session {
        user: User & DefaultSession
    }
    
    interface User {
		role: string;
		access_token?: string;
		device: [
			{
				id: string;
				device_name: string;
				last_used_at: Date;
				device_token: string;
			}
		];
	}
}

declare module "@auth/core/jwt" {
    interface JWT {
        sub: string,
        role: string
        access_token?: string
        device: [{
            id: string,
            device_name: string,
            last_used_at: Date
            device_token: string
        }]
    }
}