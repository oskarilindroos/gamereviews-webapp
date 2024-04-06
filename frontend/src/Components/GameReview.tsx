import { GameReviewData } from "../Types"
type props = {
    review: GameReviewData
}

const GameReview = ({ review }: props) => {
    const { userName, reviewText, score } = review;
    return (
        <div className="my-5">
            <div className="bg-bice-blue flex flex-row max-[350px]:flex-col justify-between p-5">
                <p className="text-2xl sm:text-4xl mr-3">Review by: {userName}</p>
                <p className="text-7xl max-md:text-4xl">{score}</p>
            </div>
            <div className="bg-picton-blue text-lg md:text-2xl p-5">
                {reviewText}
            </div>
        </div>
    )
}

export default GameReview