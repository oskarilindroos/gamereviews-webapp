import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { GameReviewData } from '../Types';
import WriteReviewPage from '../Pages/WriteReviewPage';
import { mockGameData, mockReviews } from './mock/mockData';
import ReviewForm from '../Components/ReviewForm';

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
            path: "/sendreview/:gameId",
            element: <WriteReviewPage/>
          },
      ];

    const router = createMemoryRouter(routes, {
        initialEntries: [`/sendreview/${mockGameData.igdbId}`]
    })

    return(
        <ClientProvider>
            <RouterProvider router={router} />
        </ClientProvider>
    )
}

describe("On the WriteReviewPage ", () => {
    test("game name is displayed", async () => {
        render(<Page/>)

        await waitFor(() => {
            expect(screen.getByText(mockGameData.name)).toBeInTheDocument()
        })
    })

    test("game image is displayed", async () => {
        render(<Page/>)

        const image = await waitFor(() => screen.findByRole("img"))
        expect(image.getAttribute("src")).toContain(mockGameData.coverUrl)
    })

    test("there is a score selector from 1 to 5", () =>{
        render(<Page/>)

        expect(screen.getByRole("scoreSelector")).toBeTruthy()
        const options = screen.getAllByRole("scoreOption")
        options.forEach((option, i) => {
            expect(option.innerHTML).toEqual(`${i + 1}`)
        });
        expect(options.length).toEqual(5)
    })

    test("there is a textbox for writing the review", () =>{
        render(<Page/>)

        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByLabelText("Review:")).toBeInTheDocument()
    })

    test("There is a Submit review button", () =>{
        render(<Page/>)

        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
        expect(button.getAttribute("type")).toEqual("submit")
    })

    test("the Submit review button calls the POST endpoint", async () =>{

        const user = userEvent.setup()
        const myReview:GameReviewData = {...mockReviews[0], createdAt: "", updatedAt: ""}
        const submitHandler = vi.fn()

        render(<ReviewForm submitHandler={submitHandler}/>)

        // Write review
        await user.click(screen.getByRole("textbox"))
        await user.keyboard(myReview.reviewText)

        // Submit
        await user.click(screen.getByRole("button"))

        expect(submitHandler).toHaveBeenCalledOnce()
    })
})