import AppRouterProvider from "./Components/Router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const apiBaseUrl = "http://localhost:5050"

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
    </QueryClientProvider>
  )
}

export default App