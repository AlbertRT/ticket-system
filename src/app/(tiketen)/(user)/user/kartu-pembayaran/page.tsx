import CardSection from '@/components/User/PaymentMethod/CardSection';
import { SessionProvider } from 'next-auth/react';
import React from 'react'

export default async function page() {
  return (
		<div className="w-[85%]">
			<div>
				<h2 className='font-bold text-lg'>Dompet Kamu</h2>
				<p className='text-sm text-muted-foreground'>
					Ini semua kartu yang udah kamu simpen. Mau nambah metode //
					pembayaran baru? Gaskeun aja di sini!
				</p>
			</div>

			<div className="mt-3">
				<SessionProvider>
					<CardSection />
				</SessionProvider>
			</div>
		</div>
  );
}
