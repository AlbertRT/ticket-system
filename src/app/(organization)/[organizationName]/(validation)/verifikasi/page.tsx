"use client";
import { VerifyButton } from "@/components/Organizer/ui/verify-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImgMetaData, KTPVerificationRes } from "@/types/type";
import { format, isValid } from "date-fns";
import { FilesIcon, X } from "lucide-react";
import { redirect, usePathname } from "next/navigation";
import React, { use, useState } from "react";
import { toast } from "sonner";

export default function page() {
	const [birthdayDate, setDate] = useState<string>("");
	const [nik, setNik] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [birthday_place, setBirthdayPlace] = useState<string>("");
	const [snk, setSnk] = useState<boolean>(false);
	const [ktp, setKtpFile] = useState<File | null>(null);
	const [ktpMetaData, setKtpMetaData] = useState<ImgMetaData | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
    const [KTPVerificationRes, setKTPVerificationRes] = useState<KTPVerificationRes | null>(null)
    const pathname = usePathname().split("/")[1];

	const handleKtpUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];

			if (file.size > 5 * 1024 * 1024) {
				toast.error("File terlalu besar");
				return;
			}

			setKtpFile(file);
			setKtpMetaData({
				url_preview: URL.createObjectURL(file),
				filename: file.name,
			});
		}
	};

	const verifyNow = async (): Promise<void> => {
		if (
			!ktp ||
			nik === "" ||
			name === "" ||
			birthday_place === "" ||
			snk === false ||
			birthdayDate === ""
		) {
			toast.error("Data tidak lengkap");
		}

		setLoading(true);
		console.log("loading..");

		const formData = new FormData();
		ktp && formData.append("file", ktp);
		formData.append("nik", nik);
		formData.append("nama_lengkap", name.toLowerCase()),
			formData.append(
				"tanggal_lahir",
				`${birthday_place.toLowerCase()}, ${format(
					birthdayDate,
					"dd-MM-yyyy"
				)}`
			);

		try {
			const res = await (
				await fetch("http://127.0.0.1:8000/verify", {
					method: "POST",
					body: formData,
				})
			).json();

            setKTPVerificationRes(res)

            if (res.valid) {
                setLoading(false)
                setSuccess(true)
                toast.success("Verifikasi Berhasil!")

                const verify = async () => {
                    const res_ver = await fetch("http://localhost:3000/api/organizer/verify", {
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ isValid: res.valid }),
					});

                    console.log(await res_ver.json())

                    if (res_ver.ok) {
                        Promise.resolve()
                        return true
                    } else {
                        Promise.reject()
                        return false
                    }
                };

                toast.promise(verify, {
                    loading: "Tunggu sebentar yaa!",
                    error: "Terjadi kesalahan",
                    success: (_) => {
                        return "Organisasi kamu berhasil di verifikasi"
                    }
                })

                if (await verify) {
                   window.location.href = `/${pathname}/dashboard`
                }
                

            } else {
                setLoading(false)
                setSuccess(false)
                toast.error("Verifikasi Gagal!")
            }

		} catch (error) {
			setLoading(false);
			setSuccess(false);
			console.log(error);
		}
	};

	const handleKtpDelete = (): void => {
		if (ktp && ktpMetaData) {
			setKtpFile(null);
			setKtpMetaData(null);
		}
	};

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
					<label htmlFor="ktp-upload">
						<input
							id="ktp-upload"
							type="file"
							className="hidden"
							accept="image/*"
							onChange={handleKtpUpload}
						/>
						{!ktpMetaData && (
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
						)}
					</label>

					{ktpMetaData && (
						<div className="mt-4 flex gap-4">
							<div className="group relative flex items-center justify-center w-48">
								<img
									src={ktpMetaData.url_preview}
									className="w-48 rounded-lg"
								/>
								<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
								<button
									onClick={(e) => {
										e.stopPropagation();
										handleKtpDelete();
									}}
									className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-white transition-opacity cursor-pointer w-6 h-6 flex items-center justify-center"
								>
									<X className="w-4 h-4" />
								</button>
							</div>
							<span className="text-xs">
								{ktpMetaData.filename}
							</span>
						</div>
					)}

					<div className="space-y-3 my-5">
						<Input
							className={cn(
								KTPVerificationRes?.nik_valid === false &&
									"border-red-600 text-red-600",
								"w-full h-10"
							)}
							placeholder="Masukkan 16 digit nomor KTP di sini"
							required
							value={nik}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setNik(e.target.value)}
						/>
						<Input
							className={cn(
								KTPVerificationRes?.nama_valid === false &&
									"border-red-600 text-red-600",
								"w-full h-10"
							)}
							placeholder="Nama lengkap sesuai KTP"
							required
							value={name}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setName(e.target.value.toUpperCase())}
						/>
						<div className="flex items-center gap-4">
							<Input
								className={cn(
									KTPVerificationRes?.tanggal_lahir_valid ===
										false && "border-red-600 text-red-600",
									"w-full h-10"
								)}
								required
								value={birthday_place}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) =>
									setBirthdayPlace(
										e.target.value.toUpperCase()
									)
								}
								placeholder="Tempat Lahir"
							/>
							<Input
								type="date"
								placeholder="Tanggal Lahir"
								value={birthdayDate}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setDate(e.target.value)}
								className={cn(
									KTPVerificationRes?.tanggal_lahir_valid ===
										false && "border-red-600 text-red-600",
								)}
							/>
						</div>
					</div>
					<div className="my-8 space-y-4 text-sm text-gray-600">
						<p className="text-muted-foreground">
							Kami hanya menggunakan informasi dari KTP untuk
							proses verifikasi, dan tidak pernah menyimpannya.
						</p>

						<div className="flex items-start gap-3">
							<Checkbox
								id="terms"
								defaultChecked={snk}
								onCheckedChange={() => setSnk(!snk)}
							/>
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

					<VerifyButton
						text="Verifikasi sekarang"
						className="w-full cursor-pointer"
						disabled={
							!ktp ||
							nik === "" ||
							name === "" ||
							birthday_place === "" ||
							snk === false ||
							birthdayDate === ""
						}
						isLoading={loading}
						isSuccess={success}
						onClick={verifyNow}
					/>
				</div>
			</div>
		</div>
	);
}
