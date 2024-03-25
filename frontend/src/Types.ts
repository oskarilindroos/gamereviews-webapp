export type GameSummary = {
    image: string,
    name: string,
    description: string
}

export type GameReviewData = {
    userName: string,
    reviewText: string
    score: number,
}

export type UserReviewData = {
    reviewText: string
    score: number,
    gameTitle: string,
    reviewId: string,
    gameId: string
}