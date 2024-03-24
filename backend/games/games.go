package games

type GameReviewResponse struct {
	ID       string `json:"reviewId"`
	IGDBID   int    `json:"igdbId"`
	UserID   int    `json:"userId"`
	UserName string `json:"userName"`
	Review   string `json:"reviewText"`
	Rating   int    `json:"rating"`
}
