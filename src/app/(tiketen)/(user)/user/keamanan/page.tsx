import { auth } from "@/auth";
import { Separator } from "@/components/ui/separator";
import SecurityDashboard from "@/components/User/Keamanan/SecurityDashboard";
import { redirect } from "next/navigation";

export default async function SecurityPage() {
	const session = await auth();

	if (!session) {
		redirect("/");
	}

	return (
		<div className="w-full">
			{/* Header */}
			<div className="mb-4">
				<h1 className="text-xl font-bold">Keamanan</h1>
				<span className="text-sm text-muted-foreground">
					Tempat semua keamanan akunmu
				</span>
			</div>
			<Separator className="mb-6" />
            <SecurityDashboard />
		</div>
	);
}
