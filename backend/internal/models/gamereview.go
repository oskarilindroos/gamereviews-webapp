package models

import "time"

type GameReview struct {
	ID      int       `json:"reviewId" db:"id"`
	IGDBID  string    `json:"igdbId" db:"igdb_id"`
	UserID  *string   `json:"userId" db:"user_id"` // WARN: Nullable
	Review  string    `json:"reviewText" db:"review"`
	Rating  string    `json:"rating" db:"rating"`
	Created time.Time `json:"createdAt" db:"created"`
	Updated time.Time `json:"updatedAt" db:"updated"`
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
	Storyline   string               `json:"storyline"`
	Summary     string               `json:"summary"`
	Reviews     []GameReview		 `json:"reviews"`
}