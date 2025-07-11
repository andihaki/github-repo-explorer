import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type TestWrapperProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
export const TestWrapper = ({ children }: TestWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
    </QueryClientProvider>
  );
};
