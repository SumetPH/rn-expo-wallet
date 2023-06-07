import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  children: ReactNode;
};

const client = new QueryClient();

export default function ReactQuery({ children }: Props) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
