"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { FilesIcon } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
		<div className="max-w-xl mx-auto px-4">
			<h1 className="text-3xl font-bold select-none mb-6">
				Yuk lengkapi profil kamu!
			</h1>

			<div className="bg-gray-50 border rounded-xl p-6 shadow-sm">
				<p className="text-lg font-semibold text-gray-700">
					Informasi Legal
				</p>

				<div className="mt-6 space-y-4">
					{/* Upload KTP */}
					<label htmlFor="ktp-upload">
						<input
							id="ktp-upload"
							type="file"
							className="hidden"
							accept="image/*"
						/>
						<Button
							asChild
							variant="outline"
							className="w-full h-40 flex flex-col items-center justify-center text-gray-600 border-dashed border-2 border-gray-300 hover:bg-gray-100 transition-colors"
						>
							<span>
								<FilesIcon className="w-6 h-6 mb-2" />
								<span className="text-sm font-medium">
									Upload KTP-mu
								</span>
							</span>
						</Button>
					</label>

					{/* Input Fields */}
					<div className="space-y-3 my-5">
						<Input
							className="w-full h-10"
							placeholder="Masukkan 16 digit nomor KTP di sini"
							required
						/>
						<Input
							className="w-full h-10"
							placeholder="Nama lengkap sesuai KTP"
							required
						/>
						<Textarea
							className="w-full h-10"
							placeholder="Alamat sesuai KTP"
							required
						/>
					</div>
					<div className="my-8 space-y-4 text-sm text-gray-600">
						<p className="text-muted-foreground">
							Kami hanya menggunakan informasi dari KTP untuk
							proses verifikasi, dan tidak pernah menyimpannya.
						</p>

						<div className="flex items-start gap-3">
							<Checkbox id="terms" />
							<Label
								htmlFor="terms"
								className="text-xs leading-snug"
							>
								Dengan ini saya menyatakan bahwa saya telah
								membaca dan menyetujui{" "}
								<span className="underline cursor-pointer hover:text-primary transition-colors">
									syarat dan ketentuan
								</span>{" "}
								yang berlaku.
							</Label>
						</div>
					</div>

					<Button className="w-full">Kirim Dokumen</Button>
				</div>
			</div>
		</div>
  );
}
