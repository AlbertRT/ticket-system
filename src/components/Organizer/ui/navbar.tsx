import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ChevronRight } from "lucide-react";

export default async function Navbar() {
    const session = await auth();

    if (!session) {
        redirect('/login')
    }

	return (
		<div className="w-full h-[5%] bg-white/10 backdrop-blur-md shadow-md grid grid-cols-5 items-center gap-5 px-10 sticky top-0 z-10">
			<div className="col-span-1">
				<Link
					href={"dashboard"}
					className="hover:bg-gray-100 px-3 py-2 flex items-center justify-center h-10 rounded w-max transition-colors font-bold"
				>
					GMS Church
				</Link>
			</div>
			<div className="col-span-3 justify-items-center">
				<ul className="flex items-center w-max gap-4 bg-white p-2 rounded">
					<li>
						<Link
							href={"dashboard"}
							className="w-max h-[30px] text-sm flex items-center justify-center hover:bg-primary/30 hover:text-primary font-bold transition-colors px-4 py-2 rounded"
						>
							Dashboard
						</Link>
					</li>
					<li>
						<Link
							href={"dashboard/event"}
							className="w-max h-[30px] text-sm flex items-center justify-center hover:bg-primary/30 hover:text-primary font-bold transition-colors px-4 py-2 rounded"
						>
							Event
						</Link>
					</li>
					<li>
						<Link
							href={"dashboard"}
							className="w-max h-[30px] text-sm flex items-center justify-center hover:bg-primary/30 hover:text-primary font-bold transition-colors px-4 py-2 rounded"
						>
							Akun
						</Link>
					</li>
				</ul>
			</div>
			<div className="col-span-1 justify-items-end">
				<HoverCard>
                    <HoverCardTrigger className="cursor-pointer select-none hover:bg-white h-[30px] rounded-md p-3 flex items-center transition-colors text-sm font-bold">
                        {session.user.email}
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <Link href={"/user"} className="flex items-center justify-between w-full h-10 hover:bg-gray-100 transition-colors px-4 rounded">
                            Akun
                            <ChevronRight className="w-4" />
                        </Link>
                    </HoverCardContent>
                </HoverCard>
			</div>
		</div>
	);
}
