
import { apiBaseUrl } from "../../App"
import { GameReviewData } from "../../Types"


const PostNewreview = async (reviewData: GameReviewData) => {
    const apiUrl = `${apiBaseUrl}/api/games/${reviewData. igdbId}/reviews`
    console.log(apiUrl)

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                reviewData
            })
        });
        console.log(JSON.stringify(reviewData))
        return await response.json();
    } catch (error) {
        console.log(error)
    }

}

export default PostNewreview