import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"

import ReviewForm from "../Components/ReviewForm"
import { GameReviewData, GameSummary } from "../Types"
import PostNewreview from "../API/Reviews/PostNewreview"
import GetGameInfoByIgdbId from "../API/Games/GetGameInfoByIgdbId"


const WriteReviewPage = () => {

    const nav = useNavigate()
    const parameters = useParams()
    const queryClient = useQueryClient()

    const { gameId } = parameters

    const postReviewMutation = useMutation({
        mutationFn: PostNewreview,
        // Force update of reviews when the new review is posted
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['review']})
        }
    })

    // TODO: Fetch actual gameInfo using gameId
    const gameInfo: GameSummary | undefined = useQuery({queryKey:["gameInfo"], queryFn: () => GetGameInfoByIgdbId(gameId)}).data

    const submitHandler = async (data: GameReviewData) => {
        const { reviewText, rating } = data
        if (parameters.reviewId) {
            // Editing existing review
            // TODO: Call PUT endpoint
            console.log(`Editing existing review\nID: ${parameters.reviewId}`)
            console.log(`Game: ${gameId}\nScore: ${rating}\n Review: ${reviewText}`)
        } else {
            // Posting new review
            data.igdbId = `${gameId}`
            postReviewMutation.mutate(data)
            nav(`/reviews/${gameId}`)
        }
    }

    return (
        <div className="text-gray-100 font-mono flex flex-col items-center sm:text-2xl">
            <div className="grid grid-cols-2 gap-2 mt-10 mb-5">

                <div className="">
                    <img src={gameInfo && gameInfo.coverUrl} alt={`Cover image of ${gameInfo && gameInfo.name}`} className="object-fit"></img>
                </div>

                <div className="bg-bice-blue flex items-center justify-center">
                    <h1 className="text-center sm:text-4xl lg:text-7xl">{gameInfo && gameInfo.name}</h1>
                </div>

            </div>
            <ReviewForm submitHandler={submitHandler} />
        </div>
    )
}

export default WriteReviewPage