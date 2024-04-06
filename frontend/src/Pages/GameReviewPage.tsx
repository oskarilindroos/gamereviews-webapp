import { useParams, Link } from "react-router-dom"

import GameReview from "../Components/GameReview"
import { GameReviewData } from "../Types"

const dummyData: GameReviewData[] = [
    {
        reviewId: 1,
        igdbId: "131913",
        userId: null,
        reviewText: "it was ok, for a visual novel",
        rating: "3",
        createdAt: "2024-04-06T14:14:49Z",
        updatedAt: "2024-04-06T14:14:49Z"
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
        <div className="bg-indigo-dye text-gray-100 font-mono flex flex-col items-center overflow-auto">

            <div className="flex flex-col py-10 grow">
                <div className="flex flex-row max-lg:flex-col">

                    <div className="flex flex-col w-5/12 max-lg:w-full justify-start mr-3">
                        <img src={gameInfo.image} className="object-contain"></img>
                    </div>


                    <div className="flex flex-col w-7/12 max-lg:w-full ">

                        <div className="bg-bice-blue max-md:mt-3 md:p-5 flex items-center justify-center">
                            <h1 className="text-4xl lg:text-7xl text-center">{gameInfo.name}</h1>
                        </div>

                        <div className=" flex items-center max-md:mt-3 md:p-5">
                            <p className="text-7xl max-md:text-4xl">
                                {averageScore(dummyData)}
                            </p>
                        </div>

                        <div className="flex items-center max-md:mt-3 md:p-5">
                            <p className="text-lg md:text-2xl">
                                {gameInfo.tags.map((tag, index) => <span key={index} > {` [${tag}] `} </span>)}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="mt-3">
                    <p className="text-lg md:text-2xl">
                        {gameInfo.description}
                    </p>
                </div>
            </div>

            <div className="bg-bice-blue mb-10 w-full text-center">
                <Link to={`/sendreview/${gameId}`}>
                    <p className="text-4xl">Leave a review</p>
                </Link>
            </div>

            <div className="w-full">
                {dummyData.map((item, index) => <GameReview key={index} review={item} />)}
            </div>

        </div>
    )
}

function averageScore(reviews: GameReviewData[]): number {
    let average = 0;
    if (reviews.length !== 0) {
        reviews.map(item => average += parseInt(item.rating));
        average /= reviews.length;
    }
    // Round to two decimal places
    average = Math.round(average * 100) / 100
    return average;
}

export default GameReviewPage