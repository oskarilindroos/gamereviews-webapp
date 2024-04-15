import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import GameReview from "../Components/GameReview"
import { GameReviewData } from "../Types"
import GetReviewsByIgdbId from "../API/Reviews/GetReviewsByIgdbId"

const GameReviewPage = () => {
    const { gameId } = useParams();

    const reviews = useQuery({ queryKey: ["review"], queryFn: () => GetReviewsByIgdbId(gameId) }).data
    // TODO: Fetch actual gameInfo using gameId
    const gameInfoDummy = {
        name: "Zombies shat on my brains",
        genres: ["Action", "Horror", "Yet another indie game"],
        summary: "Lorem ipsum dolor sit amet. Est illo sint est mollitia nobis et esse quibusdam qui quisquam necessitatibus est doloremque molestiae. Et ipsum voluptatem qui quia assumenda non odit vitae ut eveniet ipsa aut autem quos et nobis voluptatibus!",
        coverUrl: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }

    return (
        <div className="bg-indigo-dye text-gray-100 font-mono flex flex-col items-center overflow-auto">

            <div className="flex flex-col py-10 grow">
                <div className="flex flex-row max-lg:flex-col">

                    <div className="flex flex-col w-5/12 max-lg:w-full justify-start mr-3">
                        <img src={gameInfoDummy.coverUrl} className="object-contain"></img>
                    </div>


                    <div className="flex flex-col w-7/12 max-lg:w-full ">

                        <div className="bg-bice-blue max-md:mt-3 md:p-5 flex items-center justify-center">
                            <h1 className="text-4xl lg:text-7xl text-center">{gameInfoDummy.name}</h1>
                        </div>

                        <div className=" flex items-center max-md:mt-3 md:p-5">
                            <p className="text-7xl max-md:text-4xl">
                                {averageScore(reviews)}
                            </p>
                        </div>

                        <div className="flex items-center max-md:mt-3 md:p-5">
                            <p className="text-lg md:text-2xl">
                                {gameInfoDummy.genres.map((tag, index) => <span key={index} > {` [${tag}] `} </span>)}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="mt-3">
                    <p className="text-lg md:text-2xl">
                        {gameInfoDummy.summary}
                    </p>
                </div>
            </div>

            <div className="bg-bice-blue mb-10 w-full text-center">
                <Link to={`/sendreview/${gameId}`}>
                    <p className="text-4xl">Leave a review</p>
                </Link>
            </div>

            <div className="w-full">
                {reviews && reviews.map((item, index) => <GameReview key={index} review={item} />)}
            </div>

        </div>
    )
}

function averageScore(reviews: GameReviewData[] | undefined): number {
    let average = 0;
    if (reviews && reviews.length !== 0) {
        reviews.map(item => average += parseInt(item.rating));
        average /= reviews.length;
    }
    // Round to two decimal places
    average = Math.round(average * 100) / 100
    return average;
}

export default GameReviewPage