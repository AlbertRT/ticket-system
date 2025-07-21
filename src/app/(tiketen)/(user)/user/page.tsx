import { getUserDetails } from "@/action/get-user-details";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import BiometricVerification from "@/components/User/BiometricVerification";
import { UserProfileItem } from "@/components/User/UserProfileItem";
import { USER_PROFILE_MENU } from "@/constatnt/constant";
import { getCurrentUserDeviceAndCredential } from "@/lib/auth/biometric/getCurrentUserDeviceAndCredential";
import { Lock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function app() {
	const session = await auth();

	if (!session) {
		redirect("/");
	}

    let biometricEnabled
    try {
        const {credential} = await getCurrentUserDeviceAndCredential()
        biometricEnabled = credential ? true : false
    } catch(err) {
        biometricEnabled = false
    }

	const user = await getUserDetails(session.user.id as string,);

	return (
		<div className="w-[85%] h-full space-y-6">
			<div>
				<h2 className="font-bold text-lg">Bio Data</h2>
				<p className="text-muted-foreground text-sm">
					Hai, selamat datang. Di sini Kamu dapat melihat dan
					mengelola informasi pribadi Kamu!
				</p>
			</div>
			<div>
				{user ? (
					<div className="grid grid-cols-3 gap-4">
						<div className="col-span-1">
							<div className="border p-5 rounded-md">
								<img
									src={user.image || "/avatar.png"}
									alt={user.name as string}
									className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
								/>
							</div>
							<div className="mt-5 space-y-3">
								<Button
									asChild
									className="w-full"
									variant={"outline"}
								>
									<Link href="/auth/reset-password">
										Ubah Kata Sandi
									</Link>
								</Button>
								<Button
									className="w-full justify-between"
									variant={"outline"}
								>
									<Lock className="mr-2 h-4 w-4" />
									<span className=" w-full">PIN</span>
								</Button>
								<BiometricVerification
									biometricEnabled={biometricEnabled}
								/>
							</div>
						</div>
						<div className="col-span-2 space-y-5">
							{USER_PROFILE_MENU.map((menu, index) => (
								<div className="space-y-4" key={index}>
									<h3 className="font-bold text-lg text-muted-foreground select-none">
										Ubah {menu.header}
									</h3>
									<ul className="w-full">
										{menu.items.map((item, itemIndex) => {
											user[
												item.value as keyof typeof user
											];

											return (
												<UserProfileItem
													label={item.label}
													value={
														user[
															item.value as keyof typeof user
														]
													}
													key={`${menu.id}-${itemIndex}`}
													emailVerified={
														user.emailVerified
													}
												/>
											);
										})}
									</ul>
								</div>
							))}
						</div>
					</div>
				) : (
					<span>Memuat data user...</span>
				)}
			</div>
		</div>
	);
}
