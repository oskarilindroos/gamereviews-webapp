package games_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/oskarilindroos/review-app/internal/db"
	"github.com/oskarilindroos/review-app/internal/games"
	"github.com/oskarilindroos/review-app/internal/middleware"
	"github.com/oskarilindroos/review-app/internal/models"
	"github.com/stretchr/testify/assert"
)

// Setup a test env for integration tests
func setupTestEnvironment(t *testing.T) *games.GamesHandler {
	// Load development environment variables
	godotenv.Load("../../.env.development")

	// Set test environment variables
	t.Setenv("PORT", os.Getenv("PORT"))
	t.Setenv("DB_USER", os.Getenv("DB_USER"))
	t.Setenv("DB_PASSWORD", os.Getenv("DB_PASSWORD"))
	t.Setenv("DB_NAME", os.Getenv("DB_NAME"))
	t.Setenv("DB_HOST", os.Getenv("DB_HOST"))
	t.Setenv("IGDB_TOKEN_TILL_17_05", os.Getenv("IGDB_TOKEN_TILL_17_05"))

	db, err := db.ConnectToDB()
	if err != nil {
		t.Fatalf("Error connecting to database: %v", err)
	}

	r := mux.NewRouter()

	// Setup games service, repository and handler
	gamesRepo := games.NewMYSQLGameReviewsRepository(db)
	gamesService := games.NewGamesService(gamesRepo)
	gamesHandler := games.NewGamesHandler(gamesService)
	games.SetupRoutes(r, gamesHandler) // Setup /api/games routes
	r.Use(middleware.Cors)

	return gamesHandler
}

func TestGetAllGameReviewsHandler(t *testing.T) {
	gamesHandler := setupTestEnvironment(t)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		req := httptest.NewRequest("GET", "/games/reviews", nil)
		gamesHandler.GetAllGameReviewsHandler(rr, req)

		assert.Equal(t, http.StatusOK, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "reviewId")
	})
}

func TestGetGameReviewByIDHandler(t *testing.T) {
	gamesHandler := setupTestEnvironment(t)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		req := httptest.NewRequest("GET", "/games/reviews/{reviewId}", nil)
		req = mux.SetURLVars(req, map[string]string{"reviewId": "1"})

		gamesHandler.GetGameReviewByIDHandler(rr, req)

		assert.Equal(t, http.StatusOK, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "reviewId")
	})

	t.Run("Not found", func(t *testing.T) {
		rr := httptest.NewRecorder()
		req := httptest.NewRequest("GET", "/games/reviews/{reviewId}", nil)
		req = mux.SetURLVars(req, map[string]string{"reviewId": "999999"})

		gamesHandler.GetGameReviewByIDHandler(rr, req)

		assert.Equal(t, http.StatusInternalServerError, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "error")
	})

	t.Run("Invalid ID", func(t *testing.T) {
		rr := httptest.NewRecorder()
		req := httptest.NewRequest("GET", "/games/reviews/{reviewId}", nil)
		req = mux.SetURLVars(req, map[string]string{"reviewId": "invalid"})

		gamesHandler.GetGameReviewByIDHandler(rr, req)

		assert.Equal(t, http.StatusInternalServerError, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "error")
	})
}

func TestGetGameReviewsByIGDBIDHandler(t *testing.T) {
	gamesHandler := setupTestEnvironment(t)

	t.Run("Success", func(t *testing.T) {
		rr := httptest.NewRecorder()
		req := httptest.NewRequest("GET", "/games/{igdbId}/reviews", nil)
		req = mux.SetURLVars(req, map[string]string{"igdbId": "131913"})

		gamesHandler.GetGameReviewsByIGDBIDHandler(rr, req)

		assert.Equal(t, http.StatusOK, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "reviewId")
	})

	t.Run("Not found", func(t *testing.T) {
		rr := httptest.NewRecorder()
		req := httptest.NewRequest("GET", "/games/{igdbId}/reviews", nil)
		req = mux.SetURLVars(req, map[string]string{"igdbId": "999999"})

		gamesHandler.GetGameReviewsByIGDBIDHandler(rr, req)

		assert.Equal(t, http.StatusNotFound, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "error")
	})
}

func TestCreateGameReviewHandler(t *testing.T) {
	gamesHandler := setupTestEnvironment(t)

	t.Run("Success", func(t *testing.T) {
		// Create a payload for creating a review
		newReview := models.GameReview{
			IGDBID: "131913",
			Review: "Test review",
			Rating: "5",
		}
		newReviewJSON, err := json.Marshal(newReview)
		if err != nil {
			t.Fatalf("Error marshalling new review: %v", err)
		}

		rr := httptest.NewRecorder()
		req := httptest.NewRequest("POST", "/games/{igdbId}/reviews", bytes.NewReader(newReviewJSON))
		req = mux.SetURLVars(req, map[string]string{"igdbId": "131913"})

		gamesHandler.CreateGameReviewHandler(rr, req)

		assert.Equal(t, http.StatusCreated, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "reviewId")
	})
}

func TestUpdateGameReviewHandler(t *testing.T) {
	gamesHandler := setupTestEnvironment(t)

	t.Run("Success", func(t *testing.T) {
		// Create a payload for updating a review
		updatedReview := models.GameReview{
			Review: "Updated review",
			Rating: "1",
		}
		updatedReviewJSON, err := json.Marshal(updatedReview)
		if err != nil {
			t.Fatalf("Error marshalling updated review: %v", err)
		}

		rr := httptest.NewRecorder()
		req := httptest.NewRequest("PUT", "/games/reviews/{reviewId}", bytes.NewReader(updatedReviewJSON))
		req = mux.SetURLVars(req, map[string]string{"reviewId": "1"})

		gamesHandler.UpdateGameReviewHandler(rr, req)

		assert.Equal(t, http.StatusOK, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "reviewId")
	})

	t.Run("Not found", func(t *testing.T) {
		// Create a payload for updating a review
		updatedReview := models.GameReview{
			Review: "Updated review",
			Rating: "1",
		}
		updatedReviewJSON, err := json.Marshal(updatedReview)
		if err != nil {
			t.Fatalf("Error marshalling updated review: %v", err)
		}

		rr := httptest.NewRecorder()
		req := httptest.NewRequest("PUT", "/games/reviews/{reviewId}", bytes.NewReader(updatedReviewJSON))
		req = mux.SetURLVars(req, map[string]string{"reviewId": "999999"})

		gamesHandler.UpdateGameReviewHandler(rr, req)

		assert.Equal(t, http.StatusInternalServerError, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "error")
	})

}

func TestDeleteGameReviewHandler(t *testing.T) {
	gamesHandler := setupTestEnvironment(t)

	t.Run("Not found", func(t *testing.T) {
		rr := httptest.NewRecorder()
		req := httptest.NewRequest("DELETE", "/games/reviews/{reviewId}", nil)
		req = mux.SetURLVars(req, map[string]string{"reviewId": "999999"})

		gamesHandler.DeleteGameReviewHandler(rr, req)

		assert.Equal(t, http.StatusInternalServerError, rr.Code)
		assert.Equal(t, "application/json", rr.Header().Get("Content-Type"))
		assert.NotEmpty(t, rr.Body)
		assert.Contains(t, rr.Body.String(), "error")
	})
}
