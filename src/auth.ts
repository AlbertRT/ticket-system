import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {prisma} from "@/lib/prisma"
import Credentials from "@auth/core/providers/credentials";
import {SignInSchema} from "@/lib/zod";
import {compareSync} from "bcrypt-ts";
import Google from "@auth/core/providers/google";
export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	pages: {
		signIn: "/masuk",
	},
	providers: [
		Google,
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const validatedFields = SignInSchema.safeParse(credentials);

				if (!validatedFields.success) {
					return null;
				}

				const { email, password } = validatedFields.data;

				const user = await prisma.user.findUnique({
					where: { email },
				});

				if (!user || !user.password) {
					throw new Error("User does not exist");
				}

				const passwordMatch = compareSync(password, user.password);

				if (!passwordMatch) {
					return null;
				}

				return user;
			},
		}),
		Credentials({
			id: "device-login",
			name: "Device Login",
			credentials: {
				device_id: {},
				device_token: {}
			},
			authorize: async (credentials) => {
				const { device_id, device_token } = credentials ?? {}
				if (!device_token || !device_id) return null

				const device = await prisma.userDevice.findUnique({
					where: { id: device_id },
					include: { user: true }
				})

				if (!device || device.device_token !== device_token) return null

				return device.user
			}
		})
	],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const ProtectedRoutes = ["/user"];

			if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
				return Response.redirect(new URL("/masuk", nextUrl));
			}

			if (isLoggedIn && nextUrl.pathname.startsWith("/masuk")) {
				return Response.redirect(new URL("/", nextUrl));
			}

			return true;
		},
		jwt({ token, user, account }) {
			if (user) token.role = user.role;
			if (account?.provider === "google" && account.access_token) {
				token.access_token = account.access_token;
			}

			return token;
		},
		session({ session, token }) {
			session.user.id = token.sub;
			session.user.role = token.role;
			session.user.access_token = token.access_token as string;
			return session;
		},
	},
});