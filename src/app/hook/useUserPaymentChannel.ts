import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useUserPaymentChannels() {
	const { data, isLoading, mutate } = useSWR(
		"/api/payment/user/channel",
		fetcher
	);
	return {
		paymentChannels: data,
		isLoading,
		refresh: mutate,
	};
}
