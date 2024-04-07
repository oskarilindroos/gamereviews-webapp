// Return a list of reviews for a single game

import { GameReviewData } from "../../Types"
import { cast, a, r } from "../QuicktypeHelperFunctions"

const baseUrl = "localhost:5050"

const GetReviewsByIgdbId = async (id: string | undefined): Promise<GameReviewData[]> => {
    try {
        const apiUrl = `${baseUrl}/api/games/${id}/reviews`
        console.log(apiUrl)
        const response = await fetch(apiUrl)
        console.log(response.status)
        if (response.status === 404) {
            return []
        } else if (response.status !== 200) {
            throw new Error()
        } else {
            const result = await response.json()
            console.log(result);
            return await cast(JSON.parse(result), a(r("GameReviewData")));
        }
    } catch (error) {
        console.log("API error");
        console.log(error)
        return []
    }
}

export default GetReviewsByIgdbId