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
	GameID int    `json:"igdb_id"`
	Name   string `json:"name"`
	Cover  string `json:"cover_url"`
}

type IndividualGame struct {
	GameID      int                  `json:"igdb_id"`
	Name        string               `json:"name"`
	Cover       string               `json:"cover_url"`
	AgeRating   string               `json:"age_rating"`
	ReleaseDate int                  `json:"release_date"`
	Genres      string               `json:"genres"`
	keywords    string               `json:"keywords"`
	Storyline   string               `json:"storyline"`
	Summary     string               `json:"summary"`
	Reviews     []GameReview		 `json:"reviews"`
}