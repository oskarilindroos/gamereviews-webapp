package games

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/oskarilindroos/review-app/internal/igdb"
)

type GameWithReviews struct{
	Reviews []GameReviewResponse
	Game igdb.IndividualGame
}

// Get a list of all games (paginated?)
func GetAllGames(w http.ResponseWriter, r *http.Request) {
	//TODO: tests, 

	w.Header().Set("Content-Type", "application/json")

	var page int = 1
	var numberOfGames int = 50
	var err error

	if r.FormValue("pageNumber") != ""{
		page, err = strconv.Atoi(r.FormValue("pageNumber"))
		if err != nil{
			http.Error(w,"page number was not a number", 400)
			return
		}
	}
	if r.FormValue("numberOfGames") !=""{
		numberOfGames,err = strconv.Atoi(r.FormValue("numberOfGames"))
		if err != nil {
			http.Error(w,"number of games was not a number",400)
			return
		} else if numberOfGames < 1 {
			http.Error(w,"number has to be 1 or bigger", 400)
			return
		}
	}
	
	g,err := igdb.GetGames(numberOfGames,page)
	if err != nil {
		http.Error(w,"could not get games from igdb",500)
		return
	}
	
	json.NewEncoder(w).Encode(g)
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
	 vars := mux.Vars(r)
	 gameId := vars["igdbId"]

	 gID,err :=strconv.Atoi(gameId)
	 if err != nil {
		http.Error(w,"game id was not an integer",500)
	 }
	 game,err :=igdb.GetGameByID(gID)
	 if err != nil {
		http.Error(w,"could not get game with that id",500)
	 }
	  

	reviews := []GameReviewResponse{
		{ID: "1", IGDBID: 1, UserID: 1, Review: "This game is great!", Rating: 5},
		{ID: "2", IGDBID: 1, UserID: 2, Review: "I didn't like this game", Rating: 1},
	}

	GwR := GameWithReviews{Game:*game, Reviews: reviews}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(GwR)
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
