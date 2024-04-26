import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import FrontPage from '../Pages/FrontPage';
import Laptop from '../Assets/laptop.png'

// QueryClient provider for custom router
const ClientProvider = ({children}:{children: React.ReactElement}) =>{
    const queryClient = new QueryClient()
    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

// Own router so that the page URL can be set
const Page = () => {
    return(
        <ClientProvider>
            <FrontPage/>
        </ClientProvider>
    )
}

describe("On the FrontPage ", () =>{
    test("frontpage is displayed", async () => {
        render(<Page/>)

        await waitFor(() => {
            expect(screen.getByText("DiscoverAnd ReviewGames")).toBeInTheDocument()
        })
    })

    test("site laptop image is displayed", async () => {
        render(<Page/>)

        const image = await waitFor(() => screen.findByRole("img"))
        expect(image.getAttribute("src")).toContain(Laptop)
    })

    test("currently trending is displayed (it fails to fetch, because no api connection)", async () => {
        render(<Page/>)

        await waitFor(() => {
            expect(screen.getByText("Failed to fetch")).toBeInTheDocument()
        })
    })
})

