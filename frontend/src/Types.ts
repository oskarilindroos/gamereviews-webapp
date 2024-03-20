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

export type UserReviewData = GameReviewData & { gameTitle: string }