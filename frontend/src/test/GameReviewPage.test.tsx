import { render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import GameReviewPage from '../Pages/GameReviewPage';
import { mockGameData, mockReviews } from './mock/MockData';
import { averageScore } from '../Components/UtilityFunctions';

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
    const routes = [
        {
          path: "/reviews/:gameId",
          element: <GameReviewPage/>
        }
      ];

    const router = createMemoryRouter(routes, {
        initialEntries: [`/reviews/${mockGameData.igdbId}`]
    })

    return(
        <ClientProvider>
            <RouterProvider router={router} />
        </ClientProvider>
    )
}

describe("On the GameReviewPage ", () =>{
    test("game name is displayed", async () => {
        render(<Page/>)

        await waitFor(() => {
            expect(screen.getByText(mockGameData.name)).toBeInTheDocument()
        })
    })

    test("average score is displayed", async () =>{
        render(<Page/>)

        const averageScoreElement = await waitFor(()=>screen.findByRole("averageScore"))
        expect(averageScoreElement.innerHTML).toEqual(`${averageScore(mockReviews)}`)
    })

    test("game image is displayed", async () => {
        render(<Page/>)

        const image = await waitFor(() => screen.findByRole("img"))
        expect(image.getAttribute("src")).toContain(mockGameData.coverUrl)
    })

    test("game summary is displayed", async () => {
        render(<Page/>)

        await waitFor(() => {
            expect(screen.getByText(mockGameData.summary)).toBeInTheDocument()
        })
    })

    test("game reviews are displayed", async () => {
        render(<Page/>)

        const reviews = await screen.findAllByRole("GameReview")
        expect(mockReviews.length).toEqual(reviews.length)
        mockReviews.forEach((mock)=>{
            expect(screen.getByText(mock.rating)).toBeInTheDocument()
            expect(screen.getByText( mock.reviewText)).toBeInTheDocument()
        })
    })

    test("there is a link to WriteReviewPage", () => {
        render(<Page/>)

        const link = screen.getByRole("link", {name: "Leave a review"})
        expect(link).toBeInTheDocument()
        expect(link.getAttribute("href")).toEqual(`/sendreview/${mockGameData.igdbId}`)
    })
})

