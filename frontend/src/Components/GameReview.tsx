import { useState, useEffect } from "react";

import { GameReviewData } from "../Types"
import { UserData } from "../Types";
import getUserById from "../API/Users/GetUserById";

type props = {
    review: GameReviewData
}

const defaultUser: UserData = {
    id: "",
    user_name: "Anonymous",
    email: ""
}

const GameReview = ({ review }: props) => {
    const [user, setUser] = useState<UserData>(
        defaultUser
    )

    useEffect(() => {
        if (!!review.userId) {
            setUser(getUserById(review.userId))
        } else {
            setUser(defaultUser)
        }
    }, [review])

    const { reviewText, rating } = review;
    return (
        <div className="my-5">
            <div className="bg-bice-blue flex flex-row max-[350px]:flex-col justify-between p-5">
                <p className="text-2xl sm:text-4xl mr-3">Review by: {user.user_name}</p>
                <p className="text-7xl max-md:text-4xl">{rating}</p>
            </div>
            <div className="bg-picton-blue text-lg md:text-2xl p-5">
                {reviewText}
            </div>
        </div>
    )
}

export default GameReview