package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/oskarilindroos/review-app/internal/db"
	"github.com/oskarilindroos/review-app/internal/games"
)

func main() {
	log.Println("Starting server...")

	// Initialize routers
	r := mux.NewRouter()
	gamesRouter := games.NewRouter()

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

	r.PathPrefix("/api/games").Handler(http.StripPrefix("/api/games", gamesRouter))
	r.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "OK")
	})
	// Connect to the database
	log.Println("Connecting to database...")
	db, err := db.ConnectToDB()
	if err != nil {
		log.Fatal("Error connecting to database:")
		log.Fatal(err)
		os.Exit(1)
	}

	log.Println("Server listening on port", port)

	http.ListenAndServe(":"+port, r)
}
