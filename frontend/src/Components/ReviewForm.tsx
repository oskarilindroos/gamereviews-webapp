import { useForm } from "react-hook-form";
import { GameReviewData } from "../Types";



type props = {
    submitHandler: (reviewData: GameReviewData) => void
}

const ReviewForm = ({ submitHandler }: props) => {
    const { register, handleSubmit } = useForm<GameReviewData>()
    return (

        <div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label>Score:</label>
                {/* Create a dropdown with 5 elements */}
                <select {...register("score")}>
                    {[...Array(5)].map((_, n) => (
                        <option key={n + 1} value={n + 1}>
                            {n + 1}
                        </option>
                    ))}
                </select>

                <label>Review:</label>
                <textarea rows={10} cols={30} {...register("reviewText")} />

                <button type="submit">
                    Submit review
                </button>
            </form>
        </div>
    )
}

export default ReviewForm