import { GameReviewData } from "../Types"
type props = {
    review: GameReviewData
}

const GameReview = ({ review }: props) => {
    const { userName, reviewText, score } = review;
    return (
        <div className="my-5">
            <div className="bg-bice-blue flex flex-row justify-between p-5">
                <p className="text-4xl">Review by: {userName}</p>
                <p className="text-7xl">{score}</p>
            </div>
            <div className="bg-picton-blue text-base p-5">
                {reviewText}
            </div>
        </div>
    )
}

export default GameReview