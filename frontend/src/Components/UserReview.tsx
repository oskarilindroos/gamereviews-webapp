import { UserReviewData } from "../Types"
type props = {
    review: UserReviewData
}

const UserReview = ({ review }: props) => {
    const { gameTitle, reviewText, score, reviewId, gameId } = review;
    return (
        <div className="grid grid-cols-7 sm:grid-cols-18 gap-2 bg-bice-blue">
            <div className="col-span-2">
                <p className="">
                    {gameTitle}
                </p>

            </div>

            <div className="justify-self-center">
                <p>{score}</p>

            </div>

            <div className="sm:col-span-11 max-sm:hidden">
                <p className="truncate">
                    {reviewText}
                </p>
            </div>


            <div className="col-span-2 justify-self-center">
                {/* TODO: Wrap in a Link that leads to  */}
                {/* TODO: Make visible only if userId in localStorage matches userId parameter */}
                <p>Edit</p>
            </div>

            <div className="col-span-2 justify-self-end pr-2">
                {/* TODO: Make visible only if userId in localStorage matches userId parameter */}
                <button onClick={() => {/* TODO: Call DELETE endpoint */ }}>
                    Delete
                </button>

            </div>
        </div>
    )
}

export default UserReview