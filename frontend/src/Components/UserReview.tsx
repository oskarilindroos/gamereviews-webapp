import { UserReviewData } from "../Types"
type props = {
    review: UserReviewData
}

const UserReview = ({ review }: props) => {
    const { gameTitle, reviewText, score, reviewId, gameId } = review;
    return (
        <>
            <div className="">
                {gameTitle}
            </div>

            <div className="">
                {score}
            </div>

            <div className="col-span-8 ">
                <p className="truncate">
                    {reviewText}
                </p>
            </div>

            <div className="">
                Edit
            </div>

            <div className="">
                <button onClick={() => {/* TODO: Call DELETE endpoint */ }}>
                    Delete
                </button>

            </div>
        </>
    )
}

export default UserReview