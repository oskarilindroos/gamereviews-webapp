import { useParams } from "react-router-dom"
import GameReview from "../Components/GameReview"
import { GameReviewData } from "../Types"

const dummyData: GameReviewData[] = [
    {
        score: 2,
        userName: "420BlazeIt",
        reviewText: `Lorem ipsum dolor sit amet. Est illo sint est mollitia nobis et esse quibusdam qui quisquam necessitatibus est doloremque molestiae. Et ipsum voluptatem qui quia assumenda non odit vitae ut eveniet ipsa aut autem quos et nobis voluptatibus!

        Sit dolor dolorum ad architecto culpa aut laudantium veritatis aut quibusdam officiis! Aut voluptatibus animi et quos culpa aut quia officia et ducimus autem id nemo similique quo voluptatem neque.`
    },
    {
        score: 4,
        userName: "elonmusk",
        reviewText: `Lorem ipsum dolor sit amet. Est illo sint est mollitia nobis et esse quibusdam qui quisquam necessitatibus est doloremque molestiae. Et ipsum voluptatem qui quia assumenda non odit vitae ut eveniet ipsa aut autem quos et nobis voluptatibus!

        Sit dolor dolorum ad architecto culpa aut laudantium veritatis aut quibusdam officiis! Aut voluptatibus animi et quos culpa aut quia officia et ducimus autem id nemo similique quo voluptatem neque.`
    }
]

const GameReviewPage = () => {
    const { gameId } = useParams();
    // TODO: Fetch actual reviews using gameId

    return (
        <div className="bg-indigo-dye text-gray-100 font-mono w-screen h-screen flex justify-center overflow-auto">
            <div className="w-10/12">
                {dummyData.map((item, index) => <GameReview key={index} review={item} />)}
            </div>
        </div>
    )
}

export default GameReviewPage