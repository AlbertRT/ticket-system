// app/member/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import MemberDashboard from "@/components/User/Member/MemberDashboard";

export default async function Page() {
	const session = await auth();

	if (!session) {
		redirect("/");
	}

	return <MemberDashboard userId={session.user.id as string} />;
}
