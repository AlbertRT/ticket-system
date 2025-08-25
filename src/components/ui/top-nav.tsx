import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { Avatar, AvatarImage } from "./avatar";
import { QuickLogin } from "@/components/ui/quick-login";
import { cookies } from "next/headers";
import NotificationMenu from "./notification-menu";
import { getCurrentUserDeviceAndCredential } from "@/lib/auth/biometric/getCurrentUserDeviceAndCredential";

export default async function TopNav() {
	const session = await auth();
	const cookieStore = await cookies();
	const device_token = cookieStore.get("device_token")?.value;
	let credential = false;

	try {
		const result = await getCurrentUserDeviceAndCredential(device_token);
		credential = result.credential ? true : false;
	} catch (err) {
		credential = false;
	}

	return (
		<div className="w-full bg-white shadow py-6 px-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
				<Link href="/" className="hover:underline text-lg">
					Tiketen.com
				</Link>
				<div className="flex items-center">
					<div className="flex items-center space-x-3">
						<Button asChild variant="ghost" className="group">
							<Link href="#">
								<span>Buat Event Pertama mu!</span>
								<ChevronRight className="transition-transform group-hover:translate-x-0.5" />
							</Link>
						</Button>
						{!session ? (
							<>
								<Button asChild variant={"outline"}>
									<Link
										href="/daftar"
										className="flex items-center font-bold text-sm"
									>
										Daftar
									</Link>
								</Button>
								<Button asChild>
									{credential || device_token ? (
										<QuickLogin
											device_token={
												device_token as string
											}
											biometricEnabled={!!credential}
										/>
									) : (
										<Link
											href="/masuk"
											className="flex items-center font-bold text-sm"
										>
											Masuk
										</Link>
									)}
								</Button>
							</>
						) : (
							<div className="flex space-x-4">
								<NotificationMenu user_id={session.user.id} />
								<Button
									asChild
									variant={"outline"}
									className="flex items-center h-[40px]"
								>
									<Link href="/user">
										<Avatar className="w-6 h-6">
											<AvatarImage
												src={
													session.user.image ||
													"/avatar.png"
												}
											/>
										</Avatar>
										<span className="font-bold">
											Hi, {session.user?.name}
										</span>
									</Link>
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
