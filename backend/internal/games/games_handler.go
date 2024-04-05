package games

import (
	"encoding/json"
	"net/http"
	"strconv"

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

func (h *GamesHandler) GetGamesHandler(w http.ResponseWriter, r *http.Request) {

	var page 			int 	= 1 			// default value for page
	var numberOfGames 	int 	= 10			// default number for games on page
	var err 			error
	var order 			string	= "asc"			// default order
	var orderBy 		string 	= "relevance"	// default games are ordered by

	if r.FormValue("page_number") != ""{
		page, err = strconv.Atoi(r.FormValue("page_number"))
		if err != nil{
			WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
	}
	if r.FormValue("number_of_games") !=""{
		numberOfGames,err = strconv.Atoi(r.FormValue("number_of_games"))
		if err != nil {
			WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		} else if numberOfGames < 1 {
			WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": "Page number was lower than 1 needs to be 1 or higher"})
			return
		}
	}
	if r.FormValue("order") !=""{
		order = r.FormValue("order")
	}
	if r.FormValue("order_by") != "" {
		order = r.FormValue("order_by")
	}

	games, err := h.service.GetGames(numberOfGames,page,order,orderBy)
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

func (h *GamesHandler) GetGameByIdHandler(w http.ResponseWriter, r *http.Request){

	vars := mux.Vars(r)
	igdbID := vars["igdbId"]

	gID,err :=strconv.Atoi(igdbID)
	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	game,err :=h.service.GetGameById(gID)
	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}
	  
	reviews, err := h.service.GetGameReviewsByIGDBID(igdbID)
	if err != nil {
		WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
		return
	}

	if len(reviews) == 0 {
		WriteJSONResponse(w, http.StatusNotFound, map[string]string{"error": "No reviews found"})
		return
	}

	game.Reviews = reviews

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(game)
}

func (h *GamesHandler) SearchGamesHandler(w http.ResponseWriter, r *http.Request){

	var search string
	var page 			int 	= 1 			// default value for page
	var numberOfGames 	int 	= 10			// default number for games on page
	var err 			error
	var order 			string	= "asc"			// default order
	var orderBy 		string 	= "relevance"	// default games are ordered by


	if r.FormValue("search_content") == ""{
		http.Error(w,"Did not give search parameters",400)
		return
	}
	search=r.FormValue("search_content")

	if r.FormValue("page_number") != ""{
		page, err = strconv.Atoi(r.FormValue("page_number"))
		if err != nil{
			WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		}
	}
	if r.FormValue("number_of_games") !=""{
		numberOfGames,err = strconv.Atoi(r.FormValue("number_of_games"))
		if err != nil {
			WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": err.Error()})
			return
		} else if numberOfGames < 1 {
			WriteJSONResponse(w, http.StatusInternalServerError, map[string]string{"error": "Page number was lower than 1 needs to be 1 or higher"})
			return
		}
	}
	if r.FormValue("order") !=""{
		order = r.FormValue("order")
	}
	if r.FormValue("order_by") != "" {
		order = r.FormValue("order_by")
	}
	
	g,err := h.service.GetGamesBySearch(numberOfGames,page,search,order,orderBy)
	if err != nil {
		http.Error(w,"could not get games from igdb",500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(g)
}