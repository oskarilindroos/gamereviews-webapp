import { useParams } from "react-router-dom"

import ReviewForm from "../Components/ReviewForm"
import { GameReviewData } from "../Types"



const WriteReviewPage = () => {

    const parameters = useParams()
    const submitHandler = async (data: GameReviewData) => {
        const { reviewText, score } = data
        if (parameters.reviewId) {
            // TODO: Call PUT endpoint
            console.log(`Editing existing review\nID: ${parameters.reviewId}`)
            console.log(`Game: ${parameters.gameId}\nScore: ${score}\n Review: ${reviewText}`)
        } else {
            // TODO: Call POST endpoint

            console.log(`Posting new review:`)
            console.log(`Game: ${parameters.gameId}\nScore: ${score}\n Review: ${reviewText}`)
        }
    }

    return (
        <div className="text-gray-100 font-mono flex flex-col items-center">
            <ReviewForm submitHandler={submitHandler} />
        </div>
    )
}

export default WriteReviewPage