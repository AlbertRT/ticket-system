import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSecurityDetails() {
    const { data, error, isLoading, mutate } = useSWR(
        '/api/user/security/details/get',
        fetcher
    );

    return {
        data,
        isLoading,
        isError: error,
        refresh: mutate,
    };
}
