// Return game information based on IGDB id

import { GameSummary } from "../../Types";
import { cast, r } from "../QuicktypeHelperFunctions"
import { apiBaseUrl } from "../../App"

const GetGameInfoByIgdbId = async (id: string | undefined): Promise<GameSummary | undefined> => {
    try {
        const apiUrl = `${apiBaseUrl}/api/games/${id}`
        const response = await fetch(apiUrl)
        if (response.status !== 200) {
            throw new Error()
        } else {
            const result = await response.json()
            return await cast(result, r("GameSummary"));
        }
    } catch (error) {
        console.log(error)
        return undefined
    }
}

export default GetGameInfoByIgdbId