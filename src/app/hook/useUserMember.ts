import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useMember(userId: string) {
	const { data, error, isLoading, mutate } = useSWR(
		userId ? `/api/member/${userId}` : null,
		fetcher
	);

	return {
		member: data,
		isLoading,
		isError: error,
		mutateMember: mutate,
	};
}
