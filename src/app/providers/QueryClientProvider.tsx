import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useCheckAuth } from "@api";

interface QueryClientProviderProps {
  children: ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      // refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 3,
    },
  },
});

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanStackQueryClientProvider>
  );
}
