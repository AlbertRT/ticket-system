import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {prisma} from "@/lib/prisma"
import Credentials from "@auth/core/providers/credentials";
import {SignInSchema} from "@/lib/zod";
import {compareSync} from "bcrypt-ts";

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {strategy: "jwt"},
    pages: {
        signIn: "/masuk",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const validatedFields = SignInSchema.safeParse((credentials))

                if (!validatedFields.success) {
                    return null
                }

                const { email, password } = validatedFields.data

                const user = await prisma.user.findUnique({
                    where: { email }
                })

                if (!user || !user.password) {
                    throw new Error("User does not exist")
                }

                const passwordMatch = compareSync(password, user.password)

                if (!passwordMatch) {
                    return null
                }

                return user
            }
        })]
})