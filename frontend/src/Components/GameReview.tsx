import { GameReviewData } from "../Types"
type props = {
    review: GameReviewData
}

const GameReview = ({ review }: props) => {
    const { userName, reviewText, score } = review;
    return (
        <div className="text-white">
            <div className="bg-bice-blue flex flex-row justify-between">
                <p>Review by: {userName}</p>
                <p>{score}</p>
            </div>
            <div className="bg-picton-blue">
                {reviewText}
            </div>
        </div>
    )
}

export default GameReview