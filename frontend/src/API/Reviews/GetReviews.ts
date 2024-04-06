// Return a list of reviews for a single game

import { GameReviewData } from "../../Types"
import { cast, a, r } from "../QuicktypeHelperFunctions"

const baseUrl = import.meta.env.API_BASE_URL

const GetReviews = async (id: string): Promise<string> => {
    const apiUrl = `${baseUrl}/api/games/${id}/reviews`
    const response = await fetch(apiUrl)
    return await response.json()
}

export default GetReviews