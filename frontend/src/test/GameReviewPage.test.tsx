import { render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import GameReviewPage from '../Pages/GameReviewPage';


const routes = [
    {
      path: "/reviews/:gameId",
      element: <GameReviewPage/>
    },
  ];

const router = createMemoryRouter(routes, {
    initialEntries: ["/reviews/119171"]
})

const queryClient = new QueryClient()

describe("Upon loading, the GameReviewPage ", () =>{
    test("fetches game info from API", async () =>{
    })
})

describe("On the GameReviewPage ", () =>{
    test("game name is displayed", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>)


        await waitFor(() => expect(screen.getByText("Baldur's Gate 3")).toBeInTheDocument());
    })
})

