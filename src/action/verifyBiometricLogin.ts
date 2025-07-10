// verifyBiometricLogin.ts

import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { prisma } from "@/lib/prisma";
import { type User } from "@prisma/client";

type CredentialRecord = {
	id: string;
	credentialID: string;
	publicKey: string;
	counter: number;
	challenge: string;
	user?: User;
};

export const verifyBiometricLogin = async ({
	credential,
	response,
}: {
	credential: CredentialRecord;
	response: any;
}): Promise<boolean> => {
	try {
		const parsedResponse = JSON.parse(response);
		// Validasi presence
		if (!credential.credentialID || !parsedResponse.id) {
			console.error("Missing credential ID");
			return false;
		}
		// Domain configs
		const expectedOrigin = process.env.NEXT_PUBLIC_ORIGIN!;
		const expectedRPID = process.env.NEXT_PUBLIC_DOMAIN!;

		const verification = await verifyAuthenticationResponse({
			response: parsedResponse,
			expectedChallenge: credential.challenge,
			expectedOrigin,
			expectedRPID,
			authenticator: {
				credentialID: isoBase64URL.toBuffer(credential.id),
				credentialPublicKey: Buffer.from(
					credential.publicKey,
					"base64"
				),
				counter: credential.counter,
			},
		});

		if (verification.verified) {
			// Update authenticator counter
			await prisma.credential.update({
				where: { id: credential.id },
				data: {
					counter: verification.authenticationInfo.newCounter,
				},
			});
		}

		return verification.verified;
	} catch (e) {
		console.error("Biometric verification failed:", e);
		return false;
	}
};
