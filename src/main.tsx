import './main.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from './App';

export function main(queryClient: QueryClient) {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}
