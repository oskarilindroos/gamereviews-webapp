import AppRouterProvider from "./Components/Router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const apiBaseUrl = "http://localhost:5050"
export const maxScore = 5

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
    </QueryClientProvider>
  )
}

export default App