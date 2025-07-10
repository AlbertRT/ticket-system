import { GetUserPaymentChannel } from '@/action/get-user-payment-channel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CardSection from '@/components/User/PaymentMethod/CardSection';
import { CreditCard, Wallet2 } from "lucide-react";
import React from 'react'

export default async function page() {
    const userPaymentChannel = await GetUserPaymentChannel()
  return (
		<Card className="w-[85%]">
			<CardHeader>
				<CardTitle>Metode Pembayaran</CardTitle>
				<CardDescription>
					Ini adalah metode pembayaran yang kamu punya. Kamu bisa
					tambah metode pembayaran mu disini!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs
					defaultValue="card"
					orientation="vertical"
					className="w-full flex-row"
				>
					<TabsList className="text-foreground flex-col gap-1 rounded-none bg-transparent px-1 py-0 w-[45%]">
						<TabsTrigger
							value="card"
							className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
						>
							<CreditCard
								className="-ms-0.5 me-1.5 opacity-60"
								size={16}
							/>
							Kartu Debit/Kredit
						</TabsTrigger>
						<TabsTrigger
							value="e-wallet"
							className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
						>
							<Wallet2
								className="-ms-0.5 me-1.5 opacity-60"
								size={16}
								aria-hidden="true"
							/>
							E-Wallet
						</TabsTrigger>
					</TabsList>
					<div className="grow rounded-md border text-start">
						<TabsContent value="card">
							<CardSection
								paymentChannel={userPaymentChannel ?? null}
							/>
						</TabsContent>
						<TabsContent value="e-wallet"></TabsContent>
					</div>
				</Tabs>
			</CardContent>
		</Card>
  );
}
