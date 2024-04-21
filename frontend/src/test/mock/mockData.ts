import { GameSummary, GameReviewData } from '../../Types';

export const mockGameData: GameSummary = {
    igdbId: 119171,
    name: "Baldur's Gate 3",
    coverUrl: "https://images.igdb.com/igdb/image/upload/t_1080p/co670h.jpg",
    ageRating: "",
    releaseDate: 1601942400,
    genres: "",
    storyline: "",
    summary: "An ancient evil has returned to Baldur's Gate, intent on devouring it from the inside out. The fate of Faerun lies in your hands. Alone, you may resist. But together, you can overcome.",
    reviews: []
}

export const mockReviews: GameReviewData[] = [
    {
        reviewId: 5,
        igdbId: "119171",
        userId: null,
        reviewText: "It earned the game of the year. No competition.",
        rating: "5",
        createdAt: "2024-04-15T08:30:57Z",
        updatedAt: "2024-04-15T08:30:57Z"
    },
    {
        reviewId: 6,
        igdbId: "119171",
        userId: "1",
        reviewText: "Worst game i've ever played",
        rating: "1",
        createdAt: "2024-04-15T08:30:57Z",
        updatedAt: "2024-04-15T08:30:57Z"
    }
]