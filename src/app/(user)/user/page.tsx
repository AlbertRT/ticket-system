import { getUserDetails } from "@/action/get-user-details";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import BiometricVerification from "@/components/User/BiometricVerification";
import { UserProfileItem } from "@/components/User/UserProfileItem";
import { USER_PROFILE_MENU } from "@/constatnt/constant";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function app() {
	const session = await auth();

	if (!session) {
		redirect("/");
	}

	const user = await getUserDetails(session.user.id as string);
    const biometricEnabled = user.credentials && user.credentials.length > 0;

	return (
		<Card className="w-[90%] h-full">
			<CardHeader>
				<CardTitle>Bio Data</CardTitle>
				<CardDescription>
					Hai, selamat datang. Di sini Kamu dapat melihat dan
					mengelola informasi pribadi Kamu!
				</CardDescription>
			</CardHeader>
			<CardContent>
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
                                <BiometricVerification biometricEnabled={biometricEnabled} />
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
											const value =
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
                                                    emailVerified={user.emailVerified}
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
			</CardContent>
		</Card>
	);
}
