import { useMutation } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"

import ReviewForm from "../Components/ReviewForm"
import { GameReviewData } from "../Types"
import PostNewreview from "../API/Reviews/PostNewreview"


const WriteReviewPage = () => {

    const nav = useNavigate()

    const postReviewMutation = useMutation({
        mutationFn: PostNewreview
    })

    // TODO: Fetch actual gameInfo using gameId
    const gameInfo = {
        name: "Zombies shat on my brains",
        tags: ["Action", "Horror", "Yet another indie game"],
        description: "Lorem ipsum dolor sit amet. Est illo sint est mollitia nobis et esse quibusdam qui quisquam necessitatibus est doloremque molestiae. Et ipsum voluptatem qui quia assumenda non odit vitae ut eveniet ipsa aut autem quos et nobis voluptatibus!",
        image: "https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
    const parameters = useParams()
    const submitHandler = async (data: GameReviewData) => {
        const { reviewText, rating } = data
        const { gameId } = parameters
        if (parameters.reviewId) {
            // TODO: Call PUT endpoint
            console.log(`Editing existing review\nID: ${parameters.reviewId}`)
            console.log(`Game: ${gameId}\nScore: ${rating}\n Review: ${reviewText}`)
        } else {
            // TODO: Call POST endpoint

            console.log(`Posting new review:`)
            console.log(`Game: ${gameId}\nScore: ${rating}\n Review: ${reviewText}`)

            data.igdbId = `${gameId}`
            console.log(data)
            postReviewMutation.mutate(data)
            nav(`/reviews/${gameId}`)

        }
    }

    return (
        <div className="text-gray-100 font-mono flex flex-col items-center sm:text-2xl">
            <div className="grid grid-cols-2 gap-2 mt-10 mb-5">

                <div className="">
                    <img src={gameInfo.image} alt={`Cover image of ${gameInfo.name}`} className="object-fit"></img>
                </div>

                <div className="bg-bice-blue flex items-center justify-center">
                    <h1 className="text-center sm:text-4xl lg:text-7xl">{gameInfo.name}</h1>
                </div>

            </div>
            <ReviewForm submitHandler={submitHandler} />
        </div>
    )
}

export default WriteReviewPage