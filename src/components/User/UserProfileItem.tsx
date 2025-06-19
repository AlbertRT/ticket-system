import { Button } from "../ui/button";

type Props = {
	label: string;
	value: string | boolean | Date | { id: string; }[] | null | undefined;
	emailVerified?: Date | null;
};

export const UserProfileItem = ({ label, value, emailVerified }: Props) => {
    const displayValue =
    value instanceof Date
    ? value.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    : value ?? "-";

    const isEmailField = label.toLowerCase() === "email";
	const isEmailVerified = isEmailField && !emailVerified;


	return (
		<li className="grid grid-cols-2 gap-4">
			<span className="font-semibold select-none capitalize">
				{label}
			</span>
			<div className="grid grid-cols-2 items-center gap-2">
				<span>{displayValue as string}</span>
				{isEmailVerified ? (
					<Button
						variant="link"
						className="cursor-pointer text-red-600"
					>
						Verifikasi Email
					</Button>
				) : (
					<Button
						variant="link"
						className="cursor-pointer"
					>
						Ubah
					</Button>
				)}
			</div>
		</li>
	);
};
