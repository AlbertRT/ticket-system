import { getUserDetails } from "@/action/get-user-details";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BiometricVerification from "@/components/User/Verifcation/BiometricVerification";
import ProfileDetails from "@/components/User/Home/ProfileDetails";
import { PinVerificationDialog } from "@/components/User/Verifcation/PinVerification";
import { USER_PROFILE_MENU } from "@/constatnt/constant";
import { getCurrentUserDeviceAndCredential } from "@/lib/auth/biometric/getCurrentUserDeviceAndCredential";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function app() {
	const session = await auth();

	if (!session) {
		redirect("/");
	}

	let biometricEnabled;
	let PINEnabled;
	const { credential, pin } = await getCurrentUserDeviceAndCredential();
	try {
		biometricEnabled = credential ? true : false;
		PINEnabled = pin ? true : false;
	} catch (err) {
		biometricEnabled = false;
		PINEnabled = false;
	}

	const user = await getUserDetails(session.user.id as string);

	return (
		<div className="w-[85%] h-full space-y-8">
			{/* Hero */}
			<div className="flex items-center gap-6">
				<img
					src={user?.image || "/avatar.png"}
					alt={user?.name as string}
					className="w-24 h-24 rounded-full object-cover shadow"
				/>
				<div>
					<h2 className="font-bold text-2xl">{user?.name}</h2>
					<p className="text-muted-foreground">{user?.email}</p>
				</div>
			</div>

			{/* Tabs */}
			<Tabs defaultValue="profile" className="w-full">
				<TabsList className="grid grid-cols-3 w-full">
					<TabsTrigger value="profile">Profil</TabsTrigger>
					<TabsTrigger value="security">Keamanan</TabsTrigger>
					<TabsTrigger value="preferences">Preferensi</TabsTrigger>
				</TabsList>

				<TabsContent value="profile" className="space-y-6">
					{USER_PROFILE_MENU.map((section, i) => (
						<ProfileDetails section={section} user={user} key={i} />
					))}
				</TabsContent>

				<TabsContent value="security" className="space-y-3">
					<Button asChild variant="outline" className="w-full">
						<Link href="/auth/reset-password">Ubah Kata Sandi</Link>
					</Button>
					<PinVerificationDialog
						PINEnabled={PINEnabled}
						createdAt={pin?.createdAt}
					/>
					<BiometricVerification
						biometricEnabled={biometricEnabled}
                        createdAt={credential.createdAt}
					/>
				</TabsContent>

				<TabsContent value="preferences">
					<p className="text-muted-foreground">
						Pengaturan preferensi user…
					</p>
				</TabsContent>
			</Tabs>
		</div>
	);
}
