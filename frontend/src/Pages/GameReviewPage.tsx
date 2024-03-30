import { useParams, Link } from "react-router-dom"

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
    // TODO: Fetch actual reviews and gameInfo using gameId
    const gameInfo = {
        name: "Zombies shat on my brains",
        tags: ["Action", "Horror", "Yet another indie game"],
        description: "Lorem ipsum dolor sit amet. Est illo sint est mollitia nobis et esse quibusdam qui quisquam necessitatibus est doloremque molestiae. Et ipsum voluptatem qui quia assumenda non odit vitae ut eveniet ipsa aut autem quos et nobis voluptatibus!",
        image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }

    return (
        <div className="bg-indigo-dye text-gray-100 font-mono w-screen h-screen flex flex-col items-center overflow-auto">

            <div className="w-10/12 flex flex-col py-10 grow">
                <div className="flex flex-row max-md:flex-col">

                    <div className="flex w-5/12 max-md:w-full  mr-3">
                        <img src={gameInfo.image} className="object-fit"></img>
                    </div>


                    <div className="flex flex-col w-7/12 max-md:w-full ">

                        <div className="bg-bice-blue h-1/3 max-md:mt-3 md:p-5 flex items-center justify-center">
                            <h1 className="text-2xl sm:text-4xl text-center">{gameInfo.name}</h1>
                        </div>

                        <div className="h-1/3 flex items-center max-md:mt-3 md:p-5">
                            <p className="text-7xl max-md:text-4xl">
                                {averageScore(dummyData)}
                            </p>
                        </div>

                        <div className="h-1/3 flex items-center max-md:mt-3 md:p-5">
                            <p className="text-sm sm:text-base">
                                {gameInfo.tags.map((tag, index) => <span key={index} > {` [${tag}] `} </span>)}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="mt-3">
                    <p className="text-base">
                        {gameInfo.description}
                    </p>
                </div>
            </div>

            <div className="bg-bice-blue mb-10 w-10/12 text-center">
                <Link to={`/sendreview/${gameId}`}>
                    <p className="text-4xl">Leave a review</p>
                </Link>
            </div>

            <div className="w-10/12">
                {dummyData.map((item, index) => <GameReview key={index} review={item} />)}
            </div>

        </div>
    )
}

function averageScore(reviews: GameReviewData[]): number {
    let average = 0;
    if (reviews.length !== 0) {
        reviews.map(item => average += item.score);
        average /= reviews.length;
    }
    // Round to two decimal places
    average = Math.round(average * 100) / 100
    return average;
}

export default GameReviewPage