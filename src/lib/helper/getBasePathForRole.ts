export function getBasePathForRole(role: string, organizationSlug?: string) {
	switch (role) {
		case "ADMIN":
			return "/admin";
		case "USER":
			return "/user";
		case "ORGANIZER":
			return `/${organizationSlug || "organizer"}`;
		default:
			return "/";
	}
}
