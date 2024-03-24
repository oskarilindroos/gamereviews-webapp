package games

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

// Get a list of all games (paginated?)
func GetAllGames(w http.ResponseWriter, r *http.Request) {
	// TODO: Implement this using IGDB
}

// Get a list of all the reviews
func GetAllGameReviews(w http.ResponseWriter, r *http.Request) {
	reviews := []GameReviewResponse{
		{ID: "1", IGDBID: 1, UserID: 1, Review: "This game is great!", Rating: 5},
		{ID: "2", IGDBID: 1, UserID: 2, Review: "I didn't like this game", Rating: 1},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reviews)
}

// Get a list of reviews for a specific game by IGDB ID
func GetGameReviews(w http.ResponseWriter, r *http.Request) {
	// Get the game ID from the request
	// vars := mux.Vars(r)
	// gameId := vars["igdbId"]

	reviews := []GameReviewResponse{
		{ID: "1", IGDBID: 1, UserID: 1, Review: "This game is great!", Rating: 5},
		{ID: "2", IGDBID: 1, UserID: 2, Review: "I didn't like this game", Rating: 1},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reviews)
}

// Create a new review for a game
func CreateGameReview(w http.ResponseWriter, r *http.Request) {
	// Get the game ID from the request
	// vars := mux.Vars(r)
	// gameId := vars["gameId"]

	// Parse the request body
	var review GameReviewResponse
	_ = json.NewDecoder(r.Body).Decode(&review)

	// Create a new review
	review.ID = "3"

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(review)
}

// Get the details of a specific game review by review ID
func GetGameReviewDetails(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	reviewId := vars["reviewId"]
	review := GameReviewResponse{ID: reviewId, IGDBID: 1, UserID: 1, Review: "This game is great!", Rating: 5}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(review)
}

// Update a game review by review ID
func UpdateGameReview(w http.ResponseWriter, r *http.Request) {
	// Get the game ID from the request
	// vars := mux.Vars(r)
	// reviewId := vars["reviewId"]

	// Parse the request body
	var review GameReviewResponse
	_ = json.NewDecoder(r.Body).Decode(&review)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(review)
}

// Delete a game review by review ID
func DeleteGameReview(w http.ResponseWriter, r *http.Request) {
	// Get the game ID from the request
	// vars := mux.Vars(r)
	// reviewId := vars["reviewId"]

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode("Review deleted")
}
