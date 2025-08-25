export async function hashPin(pin: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(pin);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	return Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}
