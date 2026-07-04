import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState(<FetchState<T>>{
    data: null,
    isLoading: true,
    error: null,
  });
  useEffect(() => {
    const controller = new AbortController();

    const execute = async () => {
      try {
        setState((s) => ({ ...s, isLoading: true, error: null }));
        const response = await fetch(url, { signal: controller.signal });
        if (response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        const data = (await response.json()) as T;
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }
        setState({
          data: null,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    };
    execute();
    return () => controller.abort();
  }, [url]);
  return state;
}
