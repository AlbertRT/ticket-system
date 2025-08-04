"use client"

import { getOrgDetails } from '@/action/organizer/get-details'
import BannerUploader from '@/components/Organizer/ui/event/create/banner-uploader'
import LoadingOverlay from '@/components/ui/loading-overlay';
import { OrgDetails } from '@/types/type';
import { Verified } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {
    const pathname = usePathname().split("/")[1];
        const [details, setDetails] = useState<OrgDetails | null>(null);
    
        useEffect(() => {
            (async () => {
                const data = await getOrgDetails(pathname);
                setDetails(data);
            })();
        }, []);
    
        if (!details) {
            return <LoadingOverlay fullscreen />;
        }
  return (
		<div>
			<div className="border w-full p-8 rounded">
				<BannerUploader />
				<div className="mt-4">
					<input
						type="text"
						placeholder="Nama Event"
						required
						className="w-full h-[60px] text-lg outline-none focus:outline-none border-none focus:border-none"
					/>
				</div>
				<div className="mt-3 grid grid-cols-3">
					<div>
						<p className="font-bold text-sm">Dibuat oleh</p>
						<div className="flex items-center space-x-3">
							<p className="text-lg">{details.name}</p>
							{details.is_verified && (
								<Verified className="w-3" />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
  );
}
