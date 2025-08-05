import { useCallback, useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  const refetch = useCallback(() => {
    setReloadIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, { ...options, signal });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const json = (await response.json()) as T;
        setData(json);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url, reloadIndex]);

  return { data, isLoading, error, refetch };
}
