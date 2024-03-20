import { useParams } from "react-router-dom"

import UserReview from "../Components/UserReview"
import { UserReviewData } from "../Types"

const user = "elonmusk"

const dummyData: UserReviewData[] = [
    {
        score: 2,
        reviewText: `Lorem ipsum dolor sit amet. Est illo sint est mollitia nobis et esse quibusdam qui quisquam necessitatibus est doloremque molestiae. Et ipsum voluptatem qui quia assumenda non odit vitae ut eveniet ipsa aut autem quos et nobis voluptatibus!

        Sit dolor dolorum ad architecto culpa aut laudantium veritatis aut quibusdam officiis! Aut voluptatibus animi et quos culpa aut quia officia et ducimus autem id nemo similique quo voluptatem neque.`,
        gameTitle: "GTA 6",
        gameId: "0",
        reviewId: "0"
    },
    {
        score: 4,
        reviewText: `Lorem ipsum dolor sit amet. Est illo sint est mollitia nobis et esse quibusdam qui quisquam necessitatibus est doloremque molestiae. Et ipsum voluptatem qui quia assumenda non odit vitae ut eveniet ipsa aut autem quos et nobis voluptatibus!

        Sit dolor dolorum ad architecto culpa aut laudantium veritatis aut quibusdam officiis! Aut voluptatibus animi et quos culpa aut quia officia et ducimus autem id nemo similique quo voluptatem neque.`,
        gameTitle: "Elden Ring 2",
        gameId: "1",
        reviewId: "0"
    }
]


const UserReviewPage = () => {
    const { userId } = useParams()
    // TODO: Fetch actual username and reviews from API based on user ID
    return (
        <div className=" text-gray-100">
            <div className="grid grid-cols-12 gap-2 bg-bice-blue">
                {dummyData.map((item, index) => <UserReview key={index} review={item}></UserReview>)}
            </div>
        </div>
    )
}

export default UserReviewPage