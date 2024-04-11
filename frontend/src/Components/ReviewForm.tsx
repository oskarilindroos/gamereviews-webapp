import { useForm } from "react-hook-form";
import { GameReviewData } from "../Types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



type props = {
    submitHandler: (reviewData: GameReviewData) => void
}

const ReviewForm = ({ submitHandler }: props) => {

    const { register, handleSubmit } = useForm<GameReviewData>()
    const [defaultReview, setDefaultReview] = useState({ ratingInt: 3, reviewText: "" })
    const parameters = useParams()

    useEffect(() => {
        if (parameters.reviewId) {
            // TODO: Fetch actual reviewInfo with reviewId
            const oldReview: GameReviewData = {
                reviewId: 1,
                igdbId: "131913",
                userId: null,
                reviewText: "it was ok, for a visual novel",
                rating: "3",
                createdAt: "2024-04-06T14:14:49Z",
                updatedAt: "2024-04-06T14:14:49Z"
            }
            const { rating, reviewText } = oldReview
            const ratingInt = parseInt(rating)
            setDefaultReview({ ratingInt, reviewText })
        }
    }, [parameters.reviewId])

    return (
        <form className="w-full my-2" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col">
                <div className="my-2">
                    <label htmlFor="score">Score:</label>
                    {/* Create a dropdown with 5 elements */}
                    <select id="score" {...register("rating")} value={defaultReview.ratingInt} className="bg-bice-blue py-2 px-4 rounded-md"
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setDefaultReview((oldVal) => ({ ...oldVal, score: parseInt(event.target.value) })) }}>{/* Had to do it this way, can't change the value otherwise */}
                        {[...Array(5)].map((_, n) => (
                            <option key={n + 1} value={n + 1} >
                                {n + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="my-2">
                    <label htmlFor="reviewText">Review:</label>
                </div>

                <div>
                    <textarea defaultValue={defaultReview.reviewText} id="reviewText" rows={5} className="w-full bg-bice-blue" {...register("reviewText", { required: true })} />
                </div>

                <div className="my-2">
                    <button className="bg-picton-blue p-2 rounded-full" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ReviewForm