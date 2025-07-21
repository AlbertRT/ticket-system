type BrandRule = {
	brand: string;
	prefixes: (string | [string, string])[];
	lengths: number[];
};

const cardBrandRules: BrandRule[] = [
	{
		brand: "visa",
		prefixes: ["4"],
		lengths: [13, 16, 19],
	},
	{
		brand: "mastercard",
		prefixes: [
			["51", "55"],
			["2221", "2720"],
		],
		lengths: [16],
	},
	{
		brand: "amex",
		prefixes: ["34", "37"],
		lengths: [15],
	},
	{
		brand: "jcb",
		prefixes: [["3528", "3589"]],
		lengths: [16, 17, 18, 19],
	},
	{
		brand: "unionpay",
		prefixes: ["62"],
		lengths: [16, 17, 18, 19],
	},
];


export function validateCardNumberByBrand(cardNumber: string): {
	brand: string;
	valid: boolean;
} {
	const number = cardNumber.replace(/\D/g, "");

	for (const rule of cardBrandRules) {
		const isPrefixMatch = rule.prefixes.some((prefix) => {
			if (typeof prefix === "string") {
				return number.startsWith(prefix);
			} else {
				const [start, end] = prefix.map(Number);
				const sliced = Number(number.slice(0, start.toString().length));
				return sliced >= start && sliced <= end;
			}
		});

		const isLengthMatch = rule.lengths.includes(number.length);

		if (isPrefixMatch && isLengthMatch) {
			return { brand: rule.brand, valid: true };
		}
	}

	return { brand: "unknown", valid: false };
}
  