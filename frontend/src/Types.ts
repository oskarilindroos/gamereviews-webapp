export type GameSummary = {
    image: string,
    name: string,
    description: string,
    id: string
}

export type GameReviewData = {
    reviewId: number;
    igdbId: string;
    userId: null | string;
    reviewText: string;
    rating: string;
    createdAt: string;
    updatedAt: string;
}

export type UserData = {
    id: string,
    user_name: string,
    email: string
}

export type UserReviewData = {
    reviewText: string
    score: number,
    gameTitle: string,
    reviewId: string,
    gameId: string
}