package games

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/oskarilindroos/review-app/internal/models"
)

type GamesHandler struct {
	service *GamesService
}

func NewGamesHandler(service *GamesService) *GamesHandler {
	return &GamesHandler{
		service: service,
	}
}

// TODO: Move this to a shared package (utils.go)
func WriteJSONResponse(w http.ResponseWriter, statusCode int, data any) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	return json.NewEncoder(w).Encode(data)
}

func (h *GamesHandler) GetAllGamesHandler(w http.ResponseWriter, r *http.Request) {
	games, err := h.service.GetAllGames()

	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	WriteJSONResponse(w, http.StatusOK, games)
}

func (h *GamesHandler) CreateGameReviewHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	IGDBID := vars["igdbId"]

	var review models.GameReview
	review.IGDBID = IGDBID

	// Decode the request body into a GameReview struct
	err := json.NewDecoder(r.Body).Decode(&review)
	if err != nil {
		WriteJSONResponse(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	newReviewID, err := h.service.CreateGameReview(review)
	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	// Construct a response with the newly inserted review ID
	response := map[string]int{"reviewId": newReviewID}

	WriteJSONResponse(w, http.StatusCreated, response)
}

func (h *GamesHandler) DeleteGameReviewHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	reviewID := vars["reviewId"]

	err := h.service.DeleteGameReview(reviewID)

	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	// If no error occurred, respond with status code No Content
	WriteJSONResponse(w, http.StatusNoContent, nil)
}

func (h *GamesHandler) UpdateGameReviewHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	reviewID := vars["reviewId"]

	var review models.GameReview

	// Decode the request body into a GameReview struct
	err := json.NewDecoder(r.Body).Decode(&review)
	if err != nil {
		WriteJSONResponse(w, http.StatusBadRequest, map[string]string{"error": err.Error()})
		return
	}

	// Update the review
	updatedReview, err := h.service.UpdateGameReview(reviewID, review)
	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	WriteJSONResponse(w, http.StatusOK, updatedReview)
}

func (h *GamesHandler) GetAllGameReviewsHandler(w http.ResponseWriter, r *http.Request) {
	reviews, err := h.service.GetAllGameReviews()

	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	WriteJSONResponse(w, http.StatusOK, reviews)
}

func (h *GamesHandler) GetGameReviewByIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	reviewID := vars["reviewId"]

	review, err := h.service.GetGameReviewByID(reviewID)

	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	WriteJSONResponse(w, http.StatusOK, review)
}

func (h *GamesHandler) GetGameReviewsByIGDBIDHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	igdbID := vars["igdbId"]

	reviews, err := h.service.GetGameReviewsByIGDBID(igdbID)

	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	if len(reviews) == 0 {
		WriteJSONResponse(w, http.StatusNotFound, map[string]string{"error": "No reviews found"})
		return
	}

	WriteJSONResponse(w, http.StatusOK, reviews)
}
