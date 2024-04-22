export type GameSummary = {
    igdbId:      number;
    name:        string;
    coverUrl:    string;
    ageRating:   string;
    releaseDate: number;
    genres:      string;
    storyline:   string;
    summary:     string;
    reviews:     GameReviewData[];
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

export type GameSummarySimple = {
    igdbId:      number;
    name:        string;
    coverUrl:    string;
}