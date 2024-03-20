import { UserReviewData } from "../Types"
type props = {
    review: UserReviewData
}

const UserReview = ({ review }: props) => {
    const { gameTitle, reviewText, score } = review;
    return (
        <div>{gameTitle} {score} {reviewText}</div>
    )
}

export default UserReview