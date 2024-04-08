package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/oskarilindroos/review-app/internal/db"
	"github.com/oskarilindroos/review-app/internal/games"
	"github.com/oskarilindroos/review-app/internal/middleware"
)

func main() {
	log.Println("Starting server...")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
		os.Exit(1)
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Println("PORT is not set in the environment. Using default port 5000")
		port = "5000"
	}

	// Connect to the database
	log.Println("Connecting to database...")
	db, err := db.ConnectToDB()
	if err != nil {
		log.Fatal("Error connecting to database:")
		log.Fatal(err)
		os.Exit(1)
	}

	r := mux.NewRouter()

	// Setup games service, repository and handler
	gamesRepo := games.NewMYSQLGameReviewsRepository(db)
	gamesService := games.NewGamesService(gamesRepo)
	gamesHandler := games.NewGamesHandler(gamesService)
	games.SetupRoutes(r, gamesHandler) // Setup /api/games routes

	// Setup middleware
	r.Use(middleware.Cors) // Enable CORS

	log.Println("Server listening on port", port)

	http.ListenAndServe(":"+port, r)
}
