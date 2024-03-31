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
