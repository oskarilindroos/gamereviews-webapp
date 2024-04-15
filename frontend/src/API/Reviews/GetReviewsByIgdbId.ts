// Return a list of reviews for a single game

import { GameReviewData } from "../../Types"
import { cast, a, r } from "../QuicktypeHelperFunctions"
import { apiBaseUrl } from "../../App"

const GetReviewsByIgdbId = async (id: string | undefined): Promise<GameReviewData[] | undefined> => {
    try {
        const apiUrl = `${apiBaseUrl}/api/games/${id}/reviews`
        const response = await fetch(apiUrl)
        if (response.status === 404) {
            return []
        } else if (response.status !== 200) {
            throw new Error()
        } else {
            const result = await response.json()
            return await cast(result, a(r("GameReviewData")));
        }
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export default GetReviewsByIgdbId