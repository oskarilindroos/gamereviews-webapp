import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import userEvent from '@testing-library/user-event'

import SearchPage from '../Pages/SearchPage';

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
            <SearchPage/>
        </ClientProvider>
    )
}

describe("On the SearchPage ", () =>{
    test("SearchPage is displayed", async () => {
        render(<Page/>)

        await waitFor(() => {
            expect(screen.getByText("order")).toBeInTheDocument()
        })
    })

    test("Dropdownmenu things exist", async () => {
        render(<Page/>)

        const user = userEvent.setup()
        await user.click(screen.getByText("order"))

        await waitFor(() => {
            expect(screen.getByText("order")).toBeInTheDocument()
            expect(screen.getByText("tags")).toBeInTheDocument()
            expect(screen.getByText("year")).toBeInTheDocument()
            expect(screen.getByText("rating")).toBeInTheDocument()
        })
    })

    test("Dropdownmenu order works", async () => {
        render(<Page/>)

        const user = userEvent.setup()
        await user.click(screen.getByText("order"))

        await waitFor(() => {
            expect(screen.getByText("order")).toBeInTheDocument()
            expect(screen.getByText("name")).toBeInTheDocument()
            expect(screen.getByText("hype")).toBeInTheDocument()
            expect(screen.getByText("id")).toBeInTheDocument()
            expect(screen.getByText("release date")).toBeInTheDocument()
        })
    })

    test("Search exists", async () => {
        render(<Page/>)

        await waitFor(() => {
            expect(screen.getByText("Search")).toBeInTheDocument()
        })
    })

    test("Search works", async () => {
        render(<Page/>)

        const user = userEvent.setup()

        //In some way this doesn't prove that search works, but it proves that the textbox is fillable and the search button can be pressed
        await user.click(screen.getByRole("textbox"))
        await user.keyboard("doom")
        await user.click(screen.getByText("Search"))
    })

    test("Fetches the api (and fails)", async () => {
        render(<Page/>)

        await waitFor(() => {
            expect(screen.getByText("Failed to fetch")).toBeInTheDocument()
        })
    })

    test("Pageswapping exists", async () => {
        render(<Page/>)

        await waitFor(() => {
            expect(screen.getByText("1")).toBeInTheDocument()
            expect(screen.getByText("2")).toBeInTheDocument()
            expect(screen.getByText("3")).toBeInTheDocument()
            expect(screen.getByText("4")).toBeInTheDocument()
            expect(screen.getByText("5")).toBeInTheDocument()
            expect(screen.getByText("→")).toBeInTheDocument()
        })
    })

    test("Pageswapping works", async () => {
        render(<Page/>) 

        //Go to page 4
        const user = userEvent.setup()
        await user.click(screen.getByText("4"))

        await waitFor(() => {
            expect(screen.getByText("←")).toBeInTheDocument()
            expect(screen.getByText("2")).toBeInTheDocument()
            expect(screen.getByText("3")).toBeInTheDocument()
            expect(screen.getByText("4")).toBeInTheDocument()
            expect(screen.getByText("5")).toBeInTheDocument()
            expect(screen.getByText("6")).toBeInTheDocument()
            expect(screen.getByText("→")).toBeInTheDocument()
        })

        //Go to page 5
        await user.click(screen.getByText("→"))

        await waitFor(() => {
            expect(screen.getByText("←")).toBeInTheDocument()
            expect(screen.getByText("3")).toBeInTheDocument()
            expect(screen.getByText("4")).toBeInTheDocument()
            expect(screen.getByText("5")).toBeInTheDocument()
            expect(screen.getByText("6")).toBeInTheDocument()
            expect(screen.getByText("7")).toBeInTheDocument()
            expect(screen.getByText("→")).toBeInTheDocument()
        })

        //Go to page 4
        await user.click(screen.getByText("←"))

        await waitFor(() => {
            expect(screen.getByText("←")).toBeInTheDocument()
            expect(screen.getByText("2")).toBeInTheDocument()
            expect(screen.getByText("3")).toBeInTheDocument()
            expect(screen.getByText("4")).toBeInTheDocument()
            expect(screen.getByText("5")).toBeInTheDocument()
            expect(screen.getByText("6")).toBeInTheDocument()
            expect(screen.getByText("→")).toBeInTheDocument()
        })

        //Go to page 1
        await user.click(screen.getByText("←"))
        await user.click(screen.getByText("←"))
        await user.click(screen.getByText("←"))

        await waitFor(() => {
            expect(screen.getByText("1")).toBeInTheDocument()
            expect(screen.getByText("2")).toBeInTheDocument()
            expect(screen.getByText("3")).toBeInTheDocument()
            expect(screen.getByText("4")).toBeInTheDocument()
            expect(screen.getByText("5")).toBeInTheDocument()
            expect(screen.getByText("→")).toBeInTheDocument()
        })
    })
})

