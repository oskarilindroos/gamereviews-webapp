package games_test

import (
	"encoding/json"
	"os"
	"reflect"
	"testing"

	"github.com/Henry-Sarabia/igdb/v2"
	"github.com/oskarilindroos/review-app/internal/games"
	"github.com/oskarilindroos/review-app/internal/models"
	"github.com/pkg/errors"
)

const (
	testGameGet string = "test_data/games_service_get.json"
	testGameList string = "test_data/games_service_list.json"
	testGameSearch string = "test_data/games_service_search.json"
	testFileEmpty string ="test_data/empty.json"
	testFileEmptyList string ="test_data/empty_array.json"
	testGameGetByID string ="test_data/games_service_get_by_ID.json"
)

func TestGetGameById(t *testing.T){ 

	t.Setenv("TWITCH_CLIENT_ID", "08pq42o75ypbgn28lkygv407r9apgr")
	t.Setenv("IGDB_TOKEN_TILL_17_05", "69ai7xb1ccdubbj0qehfnufzcfx8yp")

	service:= games.GamesService{}
	
	f, err := os.ReadFile(testGameGetByID)
	if err != nil {
		t.Fatal(err)
	}

	init := &models.IndividualGame{}
	err = json.Unmarshal(f, init)
	if err != nil {
		t.Fatal(err)
	}

	var a int
	var tests = []struct{
		name string
		id int
		wantGame *models.IndividualGame
		wantErr error
	}{
		{"Status OK",131913,init,nil},
		{"Invalid ID",-1,nil,igdb.ErrNegativeID},
		{"Zero Id",0,nil,igdb.ErrNoResults},
		{"No Id",a,nil,igdb.ErrNoResults},
	}

	for _, test := range tests {
		t.Run(test.name,func(t *testing.T){

			g, err := service.GetGameById(test.id)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}

			if test.wantGame != nil{
				tGame:=&models.IndividualGame{
					GameID:      test.wantGame.GameID,
					Name:        test.wantGame.Name,
					Cover:       test.wantGame.Cover,
					ReleaseDate: test.wantGame.ReleaseDate,
					Storyline:   test.wantGame.Storyline,
					Summary:     test.wantGame.Summary,
				}

				if !reflect.DeepEqual(g, tGame){
					t.Errorf("\ngot: <%+v>, \nwant: <%+v>", g, tGame)
				}

			}else{
				if !reflect.DeepEqual(g,test.wantGame){
					t.Errorf("\ngot: <%+v>, \nwant: <%+v>", g, test.wantGame)
				}
			}
		})
	}
}


func TestGetGamesBySearch(t *testing.T)(){

	t.Setenv("TWITCH_CLIENT_ID", "08pq42o75ypbgn28lkygv407r9apgr")
	t.Setenv("IGDB_TOKEN_TILL_17_05", "69ai7xb1ccdubbj0qehfnufzcfx8yp")

	service:= games.GamesService{}

	f, err := os.ReadFile(testGameSearch)
	if err != nil {
		t.Fatal(err)
	}

	init := make([]*models.GamesList,0)
	err = json.Unmarshal(f, &init)
	if err != nil {
		t.Fatal(err)
	}

	var tests = []struct{
		name string
		numberOfGames int
		page int
		search string
		wantGame []*models.GamesList
		wantErr error
	}{
		{"Valid response",3,1,"zelda",init,nil},
		{"Negative number of games",-3,1,"zelda",nil,igdb.ErrOutOfRange},
		{"Empty query",3,1,"",nil,igdb.ErrEmptyQry},
		{"No Results",3,1,"non-existent entry",nil,igdb.ErrNoResults},	
	}

	for _, test := range tests {
		var tGame []*models.GamesList
		t.Run(test.name,func(t *testing.T){
			g, err := service.GetGamesBySearch(test.numberOfGames,test.page,test.search)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}
			if test.wantGame != nil {
				for _, sG := range test.wantGame{
					tGame = append(tGame, &models.GamesList{GameID: sG.GameID,Name: sG.Name,Cover: sG.Cover})
				}
				if !reflect.DeepEqual(g,tGame){
					t.Errorf("\ngot: <%v>, \nwant: <%v>", g, tGame)
				}
			}else{
				if !reflect.DeepEqual(g, test.wantGame){
					t.Errorf("\ngot: <%v>, \nwant: <%v>", g, test.wantGame)
				}
			}
		})
	}
}

func TestGetGames(t *testing.T)(){

	t.Setenv("TWITCH_CLIENT_ID", "08pq42o75ypbgn28lkygv407r9apgr")
	t.Setenv("IGDB_TOKEN_TILL_17_05", "69ai7xb1ccdubbj0qehfnufzcfx8yp")

	service:= games.GamesService{}

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


	var tests = []struct {
		name string
		numberOfGames int
		page int
		order string
		orderBy string
		wantGames []*models.GamesList
		wantErr error
	}{
		{"Valid response: 1 game",1,1,"desc","relevance", single, nil},
		{"Valid response: 10 games",10,1,"desc","hypes", multi, nil},
		{"Game number out of range",-1,1,"asc","name", nil, igdb.ErrOutOfRange},
		{"Error Empty Fields",1,1,"","",nil,igdb.ErrEmptyFields},
	}

	for _, test := range tests {
		var tGame []*models.GamesList
		t.Run(test.name,func(t *testing.T){
			g, err := service.GetGames(test.numberOfGames, test.page, test.order, test.orderBy)
			if errors.Cause(err) != test.wantErr {
				t.Errorf("got: <%v>, want: <%v>", errors.Cause(err), test.wantErr)
			}
			if test.wantGames != nil {
				for _, sG := range test.wantGames{
					tGame = append(tGame, &models.GamesList{GameID: sG.GameID,Name: sG.Name,Cover: sG.Cover})
				}
				if !reflect.DeepEqual(g, tGame){
					t.Errorf("\ngot: <%+v>, \nwant tgame: <%+v>", g, tGame)
				}
			}else{
				if !reflect.DeepEqual(g, test.wantGames){
					t.Errorf("\ngot: <%v>, \nwant: <%v>", g, test.wantGames)
				}
			}
		})
	}
}
