package games

import (
	"net/http"

	"github.com/gorilla/mux"
)

func SetupRoutes(r *mux.Router, h *GamesHandler) {
	s := r.PathPrefix("/api/games").Subrouter()
	s.HandleFunc("/", h.GetAllGamesHandler).Methods(http.MethodGet)
	s.HandleFunc("/reviews", h.GetAllGameReviewsHandler).Methods(http.MethodGet)
	s.HandleFunc("/reviews/{reviewId}", h.GetGameReviewByIDHandler).Methods(http.MethodGet)
	s.HandleFunc("/reviews/{reviewId}", h.UpdateGameReviewHandler).Methods(http.MethodPut)
	s.HandleFunc("/reviews/{reviewId}", h.DeleteGameReviewHandler).Methods(http.MethodDelete)
	s.HandleFunc("/{igdbId}/reviews", h.GetGameReviewsByIGDBIDHandler).Methods(http.MethodGet)
	s.HandleFunc("/{igdbId}/reviews", h.CreateGameReviewHandler).Methods(http.MethodPost)
}
