"use client"
import { useRef, useState } from "react";

export default function BannerUploader() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>("/banner.png");
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setError(null);
		const file = e.target.files?.[0];
		if (!file) return;

		const isValidExt = /\.(jpe?g|png)$/i.test(file.name);
		const isValidSize = file.size <= 5 * 1024 * 1024;

		if (!isValidExt) return setError("Hanya menerima file .jpg atau .png");
		if (!isValidSize)
			return setError("Ukuran file tidak boleh lebih dari 5MB");

		const img = new Image();
		img.src = URL.createObjectURL(file);
		img.onload = () => {
			if (img.width !== 2560 || img.height !== 800) {
				setError("Ukuran gambar harus 2560px x 800px");
				setPreview("/banner-placeholder.png");
			} else {
				setPreview(img.src);
			}
		};
  };

  return (
		<div className="space-y-3">
			<label htmlFor="event-banner">
				<input
					type="file"
					accept="image/png, image/jpeg"
					id="event-banner"
					className="hidden"
					ref={inputRef}
					onChange={handleFileChange}
				/>

				<div
					className="w-full aspect-[32/10] border-2 border-dashed border-muted flex flex-col items-center justify-center rounded-lg cursor-pointer overflow-hidden"
					onClick={() => inputRef.current?.click()}
				>
					<img
						src={preview}
						alt="Banner Preview"
						className="w-full h-full object-cover transition-opacity duration-300"
					/>
				</div>
			</label>

			<div className="text-xs text-muted-foreground text-center">
				Format: PNG atau JPG • Maks 5MB • Ukuran: 2560 × 800 piksel
			</div>

			{error && (
				<p className="text-red-500 text-sm text-center">{error}</p>
			)}
		</div>
  );
}
