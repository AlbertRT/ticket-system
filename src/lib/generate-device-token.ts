export function generateDeviceToken() {
	const array = new Uint8Array(32);
	globalThis.crypto.getRandomValues(array);
	return Buffer.from(array).toString("hex");
}
