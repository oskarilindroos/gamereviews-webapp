package igdb

import (
	"log"
	"os"

	"github.com/Henry-Sarabia/igdb/v2"
)

type GamesList struct{
	GameID int
	Name string
	Cover string
}

//gets games in order of id atm
func GetGames ( numberOfGames int, page int) ([]*GamesList,error) {

	var rGames []*GamesList
	var cIDs [] int

	var offset int
	if page > 0{
		offset = numberOfGames*(page-1)
	}else {
		offset = 0
	}
	
	igdbConnection := igdb.NewClient(os.Getenv("TWITCH_CLIENT_ID"),os.Getenv("IGDB_TOKEN_TILL_17_05"),nil)
	options:=igdb.ComposeOptions(
		igdb.SetLimit(numberOfGames),
		igdb.SetFields("name","cover"),
		igdb.SetFilter("cover",igdb.OpNotEquals,"null"),
		igdb.SetOrder("id","asc"),
		igdb.SetOffset(offset),
	)
	
	games,err := igdbConnection.Games.Index(
		options,
	)
	if err!= nil{
		log.Fatal(err)
		return nil,err
	}

	for _, game := range games{
		cIDs = append(cIDs, game.Cover)
	}

	coverOptions := igdb.ComposeOptions(
		igdb.SetFields("*"),
		igdb.SetLimit(numberOfGames),
	)
	covers, err := igdbConnection.Covers.List(cIDs,coverOptions)
	if err != nil{
		log.Fatal(err)
	}

	for _,game := range games {
		for _,cover := range covers{

			if cover.ID == game.Cover{
				img,err := cover.SizedURL(igdb.Size1080p,1)
				if err != nil{
					log.Fatal(err)
				}
				rGames = append(rGames, &GamesList{GameID: game.ID,Name: game.Name, Cover: img})
			}
		}
	}

	return rGames,nil
}
