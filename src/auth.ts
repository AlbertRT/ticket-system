import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "@auth/core/providers/credentials";
import { SignInSchema } from "@/lib/zod";
import { compareSync } from "bcrypt-ts";
import Google from "@auth/core/providers/google";
import { verifyBiometricLogin } from "./action/verifyBiometricLogin";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // 30 days
	jwt: {
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	pages: {
		signIn: "/masuk",
	},
	providers: [
		Google,
		Credentials({
			id: "",
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
					include: {
						devices: {
							select: {
								id: true,
								device_name: true,
								last_used_at: true,
							},
						},
					},
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
				device_token: {},
			},
			authorize: async (credentials) => {
				const { device_id, device_token } = credentials ?? {};
				if (!device_token || !device_id) return null;

				const device = await prisma.userDevice.findUnique({
					where: { id: device_id as string },
					include: { user: true },
				});

				if (!device || device.device_token !== device_token)
					return null;

				return device.user;
			},
		}),
		Credentials({
			id: "biometric-login",
			name: "Biometric Login",
			credentials: {
				credential_id: {},
				response: {},
			},
			authorize: async (credentials) => {
				const { credential_id, response } = credentials ?? {};

				if (
					!credential_id ||
					!response ||
					typeof response !== "string"
				) {
					console.warn("Missing credential_id or response");
					return null;
				}

				try {
					// Ambil credential berdasarkan credentialID WebAuthn
					const base64CredentialId = Buffer.from(
						isoBase64URL.toBuffer(credential_id as string)
					).toString("base64");

					const credential = await prisma.credential.findUnique({
						where: { credentialID: base64CredentialId },
						select: {
							id: true,
							credentialID: true,
							challenge: true,
							publicKey: true,
							counter: true,
							user: true,
						},
					});

					if (!credential || !credential.user) {
						console.warn("Credential or user not found");
						return null;
					}

					const verified = await verifyBiometricLogin({
						credential: {
							id: credential.id,
							credentialID: credential.credentialID,
							challenge: credential.challenge,
							publicKey: credential.publicKey,
							counter: credential.counter,
							user: credential.user,
						},
						response,
					});

					if (!verified) {
						console.warn("Biometric verification failed");
						return null;
					}

					return credential.user;
				} catch (e) {
					console.error("Biometric login error:", e);
					return null;
				}
			},
		}),
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
			if (user) {
				token.role = user.role;
			}
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
