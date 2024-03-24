import { useForm } from "react-hook-form";
import { GameReviewData } from "../Types";



type props = {
    submitHandler: (reviewData: GameReviewData) => void
}

const ReviewForm = ({ submitHandler }: props) => {

    const { register, handleSubmit } = useForm<GameReviewData>()
    return (
        <form className="w-full my-2" onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col">
                <div className="my-2">
                    <label>Score:</label>
                    {/* Create a dropdown with 5 elements */}
                    <select {...register("score")} className="bg-bice-blue py-2 px-4 rounded-md">
                        {[...Array(5)].map((_, n) => (
                            <option key={n + 1} value={n + 1} selected={n + 1 === 3}>
                                {n + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="my-2">
                    <label>Review:</label>
                </div>

                <div>
                    <textarea rows={5} className="w-full bg-bice-blue" {...register("reviewText", { required: true })} />
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