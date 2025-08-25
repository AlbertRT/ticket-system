import { Link } from 'lucide-react';

import React from 'react'
import { Button } from './button';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Avatar, AvatarImage } from './avatar';

export default async function UserProfileBtn() {
    const session = await auth()

    if (!session) {
        redirect('/login')
    }

  return (
		<Button
			asChild
			variant={"outline"}
			className="flex items-center h-[40px]"
	>
			<Link href="/user">
				<Avatar className="w-6 h-6">
					<AvatarImage src={session.user.image || "/avatar.png"} />
				</Avatar>
				<span className="font-bold">Hi, {session.user?.name}</span>
			</Link>
		</Button>
  );
}
