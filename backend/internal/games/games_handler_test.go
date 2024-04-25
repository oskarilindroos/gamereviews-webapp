package games_test

import (
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"reflect"
	"strings"
	"testing"
	"time"

	"github.com/gorilla/mux"
	"github.com/oskarilindroos/review-app/internal/db"
	"github.com/oskarilindroos/review-app/internal/games"
	"github.com/oskarilindroos/review-app/internal/middleware"
	"github.com/oskarilindroos/review-app/internal/models"
)

const(
	testGetGameByIdHandlerWithReviews string ="test_data/games_handler_get_game_by_ID_with_reviews.json"
	testGetGameByIdHandlerNoReviews string ="test_data/games_handler_get_game_by_ID_no_reviews.json"

)

func TestGetGamesHandler(t *testing.T){

	t.Setenv("TWITCH_CLIENT_ID", "08pq42o75ypbgn28lkygv407r9apgr")
	t.Setenv("IGDB_TOKEN_TILL_17_05", "69ai7xb1ccdubbj0qehfnufzcfx8yp")

	f1, err := os.ReadFile(testGameGet)
	if err != nil {
		t.Fatal(err)
	}
	single := make([]*models.GamesList,0)
	err = json.Unmarshal(f1, &single)
	if err != nil {
		t.Fatal(err)
	}

	f2, err := os.ReadFile(testGameList)
	if err != nil {
		t.Fatal(err)
	}
	multi := make([]*models.GamesList,0)
	err = json.Unmarshal(f2, &multi)
	if err != nil {
		t.Fatal(err)
	}
	handler:= games.GamesHandler{}
	
	var tests = []struct{
		name 				string
		page_number 		string
		number_of_games 	string
		order 				string
		order_by 			string
		wantSuccessBody		[]*models.GamesList
		wantErrorBody		string
		wantCode			int
	}{
		{"get single game with status ok","1","1","desc","relevance",single,"", http.StatusOK},
		{"get list of games with status ok","1","10","asc","id",multi,"", http.StatusOK},
		{"Get error empty variables","","","","",nil,
		`{"error":"cannot get index of Games: cannot create request with invalid options: cannot unwrap invalid option: cannot compose invalid functional options: cannot unwrap invalid option: one or more provided option field values are empty"}`,
		http.StatusInternalServerError},
		{"Get error number out of range","1","-1","asc","hypes",nil,
		`{"error":"Page number was lower than 1 needs to be 1 or higher"}`,
		http.StatusInternalServerError},
	}

	for _, test := range tests{

		t.Run(test.name,func(t *testing.T) {
			resp:=httptest.NewRecorder()
		
			req := httptest.NewRequest("GET","/",nil)

			q := req.URL.Query()
			q.Add("page_number",test.page_number)
			q.Add("number_of_games",test.number_of_games)
			q.Add("order",test.order)
			q.Add("order_by",test.order_by)
			req.URL.RawQuery= q.Encode()
			handler.GetGamesHandler(resp, req)

			if resp.Result().StatusCode != test.wantCode {
				t.Fatalf("The status code should be <%v> but received <%v>",resp.Result().StatusCode,test.wantCode)
			}
			if resp.Result().StatusCode == http.StatusOK{

				bb := resp.Body.Bytes()
				c := []*models.GamesList{}

				err = json.Unmarshal(bb, &c)
				if err != nil {
					t.Fatal(err)
				}
				if !reflect.DeepEqual(test.wantSuccessBody,c){
					t.Fatalf("Wanted in body: <%v> \ngot: <%v>",test.wantSuccessBody,c)
				}
			}else{
				bb := resp.Body.String()
				cc := test.wantErrorBody
				d :=  strings.TrimSpace(bb)
				if d != cc{
					t.Fatalf("Wanted error message '<%v>' \n got '<%v>'",cc,d)
				}
			}
			
		})
	}
}

func TestSearchGamesHandler(t *testing.T){

	t.Setenv("TWITCH_CLIENT_ID", "08pq42o75ypbgn28lkygv407r9apgr")
	t.Setenv("IGDB_TOKEN_TILL_17_05", "69ai7xb1ccdubbj0qehfnufzcfx8yp")

	f, err := os.ReadFile(testGameSearch)
	if err != nil {
		t.Fatal(err)
	}
	init := make([]*models.GamesList,0)
	err = json.Unmarshal(f, &init)
	if err != nil {
		t.Fatal(err)
	}
	handler:= games.GamesHandler{}
	
	var tests = []struct{
		name 				string
		page_number 		string
		number_of_games 	string
		search 				string
		wantSuccessBody		[]*models.GamesList
		wantErrorBody		string
		wantCode			int
	}{
		{"search games with status ok","1","3","zelda",init,"", http.StatusOK},
		{"Get error empty variables","","","",nil, `{"error":"Did not give search parameters"}`,400},
		{"Get error number out of range","1","-1","zelda",nil, `{"error":"Page number was lower than 1 needs to be 1 or higher"}`, http.StatusInternalServerError},
	}

	for _, test := range tests{

		t.Run(test.name,func(t *testing.T) {
			resp:=httptest.NewRecorder()
		
			req := httptest.NewRequest("GET","/search",nil)

			q := req.URL.Query()
			q.Add("page_number",test.page_number)
			q.Add("number_of_games",test.number_of_games)
			q.Add("search_content",test.search)
			req.URL.RawQuery= q.Encode()
			handler.SearchGamesHandler(resp, req)

			if resp.Result().StatusCode != test.wantCode {
				log.Printf("status: %v",resp.Body.String())
				t.Fatalf("The status code should be <%v> but received <%v>",test.wantCode,resp.Result().StatusCode)
			
			}
			if resp.Result().StatusCode == http.StatusOK{

				bb := resp.Body.Bytes()
				c := []*models.GamesList{}

				err = json.Unmarshal(bb, &c)
				if err != nil {
					t.Fatal(err)
				}
				if !reflect.DeepEqual(test.wantSuccessBody,c){
					t.Fatalf("Wanted in body: <%v> \ngot: <%v>",test.wantSuccessBody,c)
				}
			}else{
				bb := resp.Body.String()
				cc := test.wantErrorBody
				d :=  strings.TrimSpace(bb)
				if d != cc{
					t.Fatalf("Wanted error message '<%v>' \n got '<%v>'",cc,d)
				}
			}
			
		})
	}
}

func TestGetGameByIdHandler(t *testing.T){

	t.Setenv("TWITCH_CLIENT_ID", "08pq42o75ypbgn28lkygv407r9apgr")
	t.Setenv("IGDB_TOKEN_TILL_17_05", "69ai7xb1ccdubbj0qehfnufzcfx8yp")
	t.Setenv("DB_PASSWORD","dev")
	t.Setenv("CORS_ORIGIN","http://localhost:5173")
	t.Setenv("PORT","5050")
	t.Setenv("DB_USER","dev")
	t.Setenv("DB_NET","tcp")
	t.Setenv("DB_ADDR","localhost")
	t.Setenv("DB_DATABASE","reviewapp")

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
	r.Use(middleware.Cors)

	type b struct{	
		ID      int       `json:"reviewId" db:"id"`
		IGDBID  string    `json:"igdbId" db:"igdb_id"`
		UserID  *string   `json:"userId" db:"user_id"` // WARN: Nullable
		Review  string    `json:"reviewText" db:"review"`
		Rating  string    `json:"rating" db:"rating"`
		Created time.Time `json:"createdAt" db:"created"`
		Updated time.Time `json:"updatedAt" db:"updated"`
	}
	type a struct{
		GameID      int                  `json:"igdbId"`
		Name        string               `json:"name"`
		Cover       string               `json:"coverUrl"`
		AgeRating   string               `json:"ageRating"`
		ReleaseDate int                  `json:"releaseDate"`
		Genres      string               `json:"genres"`
		Storyline   string               `json:"storyline"`
		Summary     string               `json:"summary"`
		Reviews     []b		 			`json:"reviews"`
	}


	f, err := os.ReadFile(testGetGameByIdHandlerWithReviews)
	if err != nil {
		t.Fatal(err)
	}
	withReviews := &a{}
	err = json.Unmarshal(f, &withReviews)
	if err != nil {
		t.Fatal(err)
	}
	f2, err := os.ReadFile(testGetGameByIdHandlerNoReviews)
	if err != nil {
		t.Fatal(err)
	}
	noReviews := &a{}
	err = json.Unmarshal(f2, &noReviews)
	if err != nil {
		t.Fatal(err)
	}
	
	
	var tests = []struct{
		name 				string
		gameID				string
		wantSuccessBody		*a
		wantErrorBody		string
		wantCode			int
	}{
		{"Get game data successfully","131913",withReviews,"",http.StatusOK},
		{"Get game data successfully","13191",noReviews,"",http.StatusOK},
		{"Invalid ID","-1",nil,`{"error":"ID cannot be negative"}`, http.StatusInternalServerError},
		{"Zero Id","0",nil,`{"error":"cannot get Game with ID 0: cannot make POST request: results are empty"}`, http.StatusInternalServerError},
	}

	for _, test := range tests{

		t.Run(test.name,func(t *testing.T) {
			resp:=httptest.NewRecorder()

			



			req:= httptest.NewRequest("GET","/{igdbId}",nil)
			req = mux.SetURLVars(req,map[string]string{"igdbId":test.gameID})
	
			q := req.URL.Query()
			req.URL.RawQuery= q.Encode()
			
			gamesHandler.GetGameByIdHandler(resp, req)


			if resp.Result().StatusCode != test.wantCode {
				t.Fatalf("The status code should be <%v> but received <%v>",test.wantCode,resp.Result().StatusCode)
			
			}
			if resp.Result().StatusCode == http.StatusOK{

				bb := resp.Body.Bytes()
				c := &a{}

				err = json.Unmarshal(bb, c)
				if err != nil {
					t.Fatal(err)
				}
				if !reflect.DeepEqual(test.wantSuccessBody,c){
					t.Fatalf("Wanted in body: <%v> \ngot: <%v>",test.wantSuccessBody,c)
				}
			}else{
				bb := resp.Body.String()
				cc := test.wantErrorBody
				d :=  strings.TrimSpace(bb)
				if d != cc{
					t.Fatalf("Wanted error message '<%v>' \n got '<%v>'",cc,d)
				}
			}
			
		})
	}
}
