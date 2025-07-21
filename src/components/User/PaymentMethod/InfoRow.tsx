export const InfoRow = ({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: React.ReactNode;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2 text-muted-foreground">
			<div className="bg-white rounded border p-1">{icon}</div>
			<span>{label}</span>
		</div>
		<div className="text-right font-medium">{value}</div>
	</div>
);
