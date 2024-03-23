import { useForm } from "react-hook-form";
import { GameReviewData } from "../Types";



type props = {
    submitHandler: (reviewData: GameReviewData) => void
}

const ReviewForm = ({ submitHandler }: props) => {
    const { register, handleSubmit } = useForm<GameReviewData>()
    return (

        <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col">
                <div>
                    <label>Score:</label>
                    {/* Create a dropdown with 5 elements */}
                    <select {...register("score")} className="bg-bice-blue">
                        {[...Array(5)].map((_, n) => (
                            <option key={n + 1} value={n + 1}>
                                {n + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Review:</label>
                </div>

                <div>
                    <textarea rows={10} className="w-full bg-bice-blue" {...register("reviewText")} />
                </div>

                <div>
                    <button type="submit">
                        Submit review
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ReviewForm