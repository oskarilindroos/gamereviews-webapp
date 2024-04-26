import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import GameReview from "../Components/GameReview"
import { GameReviewData, GameSummary } from "../Types"
import GetReviewsByIgdbId from "../API/Reviews/GetReviewsByIgdbId"
import GetGameInfoByIgdbId from "../API/Games/GetGameInfoByIgdbId"
import { averageScore } from "../Components/UtilityFunctions"
import { maxScore } from "../App"

const GameReviewPage = () => {
    const { gameId } = useParams();
    const reviews: GameReviewData[] | undefined = useQuery({ queryKey: ["review"], queryFn: () => GetReviewsByIgdbId(gameId) }).data
    const gameInfo: GameSummary | undefined = useQuery({queryKey:["gameInfo"], queryFn: () => GetGameInfoByIgdbId(gameId)}).data
    const tagList = gameInfo && gameInfo.genres.split(',')

    return (
        <div className="bg-indigo-dye text-gray-100 font-mono flex flex-col items-center overflow-auto">

            <div className="flex flex-col py-10 grow">
                <div className="flex flex-row max-lg:flex-col">

                    <div className="flex flex-col w-5/12 max-lg:w-full justify-start mr-3">
                        <img src={gameInfo && gameInfo.coverUrl} className="object-contain"></img>
                    </div>


                    <div className="flex flex-col w-7/12 max-lg:w-full ">

                        <div className="bg-bice-blue max-md:mt-3 md:p-5 flex items-center justify-center">
                            <h1 className="text-4xl lg:text-7xl text-center">{gameInfo && gameInfo.name}</h1>
                        </div>

                        <div className=" flex items-center max-md:mt-3 md:p-5">
                            <p role="averageScore" className="text-7xl max-md:text-4xl">
                                {reviews && reviews?.length > 0 ? `Average score:${averageScore(reviews)}/${maxScore}`  : 'No reviews yet'}
                            </p>
                        </div>

                        <div className="flex items-center max-md:mt-3 md:p-5">
                            <p className="text-lg md:text-2xl">
                            {gameInfo && gameInfo.summary}
                            </p>
                        </div>

                    </div>
                </div>

            </div>

            <div className="bg-bice-blue mb-10 w-full text-center">
                <Link to={`/sendreview/${gameId}`}>
                    <p className="text-4xl">Leave a review</p>
                </Link>
            </div>

            <div className="w-full">
                {reviews && reviews.length === 0? 'This game has not been reviewed yet' : ''}
                {reviews && reviews.map((item, index) => <GameReview key={index} review={item} />)}
            </div>

        </div>
    )
}



export default GameReviewPage