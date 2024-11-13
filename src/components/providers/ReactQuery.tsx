'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'

interface ReactQueryProviderProps {
    children: React.ReactNode
}
const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes
            }
        }

    }
)

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>

}

export default ReactQueryProvider