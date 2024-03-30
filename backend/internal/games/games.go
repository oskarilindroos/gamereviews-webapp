package games

type GameReviewResponse struct {
	ID       string `json:"reviewId"`
	IGDBID   int    `json:"igdbId"`
	UserID   int    `json:"userId"`
	UserName string `json:"userName"`
	Review   string `json:"reviewText"`
	Rating   int    `json:"rating"`
}

type GameWithReviews struct {
	Reviews []GameReviewResponse `json:"reviews"`
	Game    IndividualGame       `json:"game"`
}

type GamesList struct {
	GameID int    `json:"igdbId"`
	Name   string `json:"name"`
	Cover  string `json:"coverUrl"`
}

type IndividualGame struct {
	GameID      int                  `json:"igdbId"`
	Name        string               `json:"name"`
	Cover       string               `json:"coverUrl"`
	AgeRating   string               `json:"ageRating"`
	ReleaseDate int                  `json:"releaseDate"`
	Genres      string               `json:"genres"`
	keywords    string               `json:"keywords"`
	Storyline   string               `json:"storyline"`
	Summary     string               `json:"summary"`
	Reviews     []GameReviewResponse `json:"reviews"`
}