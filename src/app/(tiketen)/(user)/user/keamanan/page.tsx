import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Laptop } from "lucide-react";
import React from "react";

export default function page() {
	return (
		<Card className="w-full max-w-3xl">
			<CardHeader>
				<CardTitle>Pusat Keamanan</CardTitle>
				<CardDescription>
					Halaman ini ngebantu kamu buat pantau keamanan akun—dari
					login terakhir, pengaturan keamanan, sampai opsi pemulihan.
					Semuanya dirancang biar akun kamu tetap aman, nyaman, dan
					gak bikin pusing. 🔒
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Aktivitas login saat ini</p>
				<ul className="mt-4">
					<li className="w-full h-[60px] flex items-center justify-between px-5 select-none">
						<div className="flex items-center">
							<Laptop className="w-10 h-10" />
							<div className="ml-2">
								<p className="font-bold text-sm">
									Firefox 140.0 | Windows
								</p>
							</div>
						</div>
                        <Button variant="ghost" className="h-8 cursor-pointer">
                            Keluar
                        </Button>
					</li>
				</ul>
			</CardContent>
		</Card>
	);
}
