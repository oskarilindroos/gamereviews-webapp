package games

import (
	"net/http"

	"github.com/gorilla/mux"
)

func NewRouter() http.Handler {
	r := mux.NewRouter()

	r.HandleFunc("/", GetAllGames).Methods(http.MethodGet)
	r.HandleFunc("/{igdbId}/reviews", GetGameReviews).Methods(http.MethodGet)
	r.HandleFunc("/{igdbId}/reviews", CreateGameReview).Methods(http.MethodPost)
	r.HandleFunc("/reviews", GetAllGameReviews).Methods(http.MethodGet)
	r.HandleFunc("/reviews/{reviewId}", GetGameReviewDetails).Methods(http.MethodGet)
	r.HandleFunc("/reviews/{reviewId}", UpdateGameReview).Methods(http.MethodPut)
	r.HandleFunc("/reviews/{reviewId}", DeleteGameReview).Methods(http.MethodDelete)

	return r
}
