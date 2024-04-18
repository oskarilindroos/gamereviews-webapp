import { GameReviewData } from "../Types";

export function averageScore(reviews: GameReviewData[] | undefined): number {
    let average = 0;
    if (reviews && reviews.length !== 0) {
        reviews.map(item => average += parseInt(item.rating));
        average /= reviews.length;
    }
    // Round to two decimal places
    average = Math.round(average * 100) / 100
    return average;
}