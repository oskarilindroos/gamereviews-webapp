import { UserReviewData } from "../Types"
type props = {
    review: UserReviewData
}

const UserReview = ({ review }: props) => {
    const { gameTitle, reviewText, score, reviewId, gameId } = review;
    return (
        <div className="grid grid-cols-18 gap-2 bg-bice-blue">
            <div className="col-span-2">
                <h2 className="">
                    {gameTitle}
                </h2>

            </div>

            <div className="justify-self-center">
                <p>{score}</p>

            </div>

            <div className="col-span-11 ">
                <p className="truncate">
                    {reviewText}
                </p>
            </div>

            <div className="col-span-2 justify-self-center">
                Edit
            </div>

            <div className="col-span-2 justify-self-end">
                <button onClick={() => {/* TODO: Call DELETE endpoint */ }}>
                    Delete
                </button>

            </div>
        </div>
    )
}

export default UserReview