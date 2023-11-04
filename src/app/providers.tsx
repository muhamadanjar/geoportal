'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }:React.PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient({ defaultOptions: { queries: {staleTime: 5000}}}))

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}