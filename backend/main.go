package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/oskarilindroos/review-app/games"
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

	log.Println("Server listening on port", port)

	http.ListenAndServe(":"+port, r)
}
