package games

import (
	"log"
	"os"

	"github.com/Henry-Sarabia/igdb/v2"
	"github.com/oskarilindroos/review-app/internal/models"
)

type GamesService struct {
	repo GameReviewsRepository
}

func NewGamesService(repo GameReviewsRepository) *GamesService {
	return &GamesService{
		repo: repo,
	}
}

func (s *GamesService) GetGames( numberOfGames int, page int,order string,orderBy string) ([]*models.GamesList, error) {

	var returnGames []*models.GamesList
	var cIDs [] int
	var offset int
	orderIn :=igdb.OrderAscending

	if order == "desc" {
		orderIn = igdb.OrderDescending
	} 
	if order == "asc"{
		orderIn = igdb.OrderAscending
	}
	if numberOfGames < 1 || numberOfGames > 500{
		return nil, igdb.ErrOutOfRange
	}
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
		igdb.SetOrder(orderBy,orderIn),
		igdb.SetOffset(offset),
	)
	
	games,err := igdbConnection.Games.Index(
		options,
	)
	if err!= nil{
		log.Println(err)
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
		log.Println(err)
		return nil,err
	}

	for _,game := range games {
		for _,cover := range covers{

			if cover.ID == game.Cover{
				img,err := cover.SizedURL(igdb.Size1080p,1)
				if err != nil{
					log.Println(err)
					return nil,err
				}
				returnGames = append(returnGames, &models.GamesList{GameID: game.ID,Name: game.Name, Cover: img})
			}
		}
	}

	return returnGames,nil
}

func (s *GamesService) CreateGameReview(review models.GameReview) (int, error) {
	newReviewID, err := s.repo.Create(review)

	if err != nil {
		log.Println(err)
		return 0, err
	}

	return newReviewID, nil
}

func (s *GamesService) DeleteGameReview(reviewID string) error {
	err := s.repo.Delete(reviewID)

	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func (s *GamesService) UpdateGameReview(reviewID string, review models.GameReview) (models.GameReview, error) {
	updatedReview, err := s.repo.Update(reviewID, review)

	if err != nil {
		log.Println(err)
		return models.GameReview{}, err
	}

	return updatedReview, nil
}

func (s *GamesService) GetAllGameReviews() ([]models.GameReview, error) {
	reviews, err := s.repo.GetAll()

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return reviews, nil
}

func (s *GamesService) GetGameReviewByID(reviewID string) (models.GameReview, error) {
	review, err := s.repo.GetByID(reviewID)

	if err != nil {
		log.Println(err)
		return models.GameReview{}, err
	}

	return review, nil
}

func (s *GamesService) GetGameReviewsByIGDBID(igdbID string) ([]models.GameReview, error) {
	reviews, err := s.repo.GetByIGDBID(igdbID)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return reviews, nil
}

func (s *GamesService) GetGameById(gameID int)(*models.IndividualGame,error){

	var offset int = 0
	var numberOfGames int = 10

	igdbConnection := igdb.NewClient(os.Getenv("TWITCH_CLIENT_ID"),os.Getenv("IGDB_TOKEN_TILL_17_05"),nil)
	options:=igdb.ComposeOptions(
		igdb.SetLimit(numberOfGames),
		igdb.SetFields("name","cover","first_release_date","summary","storyline"),
		igdb.SetFilter("cover",igdb.OpNotEquals,"null"),
		igdb.SetOffset(offset),
	)

	game,err := igdbConnection.Games.Get(
		gameID,
		options,
	)
	if err!= nil{
		log.Println(err)
		return nil,err
	}
	
	cover,err := igdbConnection.Covers.Get(game.Cover, igdb.SetFields("*"))
	if err != nil {
		log.Println(err)
		return nil,err
	}

	img,err := cover.SizedURL(igdb.Size1080p,1)
	if err != nil{
		log.Println(err)
		return nil,err
	}
	
	rGame := &models.IndividualGame{
		GameID:      game.ID,
		Name:        game.Name,
		Cover:       img,
		ReleaseDate: game.FirstReleaseDate,
		Storyline:   game.Storyline,
		Summary:     game.Summary,
	}

	return rGame,nil
}

func (s *GamesService) GetGamesBySearch(numberOfGames int,page int, search string,order string,orderBy string)([]*models.GamesList,error){

	var offset int = 0
	var rGames []*models.GamesList
	var cIDs [] int
	var gIDs [] int

	if numberOfGames < 1 {
		numberOfGames = 10
	}
	if page > 0{
		offset = numberOfGames*(page-1)
	}else {
		offset = 0
	}

	igdbConnection := igdb.NewClient(os.Getenv("TWITCH_CLIENT_ID"),os.Getenv("IGDB_TOKEN_TILL_17_05"),nil)
	options:=igdb.ComposeOptions(
		igdb.SetFields("name","cover",),
		igdb.SetFilter("cover",igdb.OpNotEquals,"null"),
		igdb.SetOrder("id","asc"),
		
	)
	searchOptions:=igdb.ComposeOptions(
		igdb.SetLimit(numberOfGames),
		igdb.SetFields("*"),
		igdb.SetOffset(offset),
	)

	results,err := igdbConnection.Search(
		search,
		searchOptions,
	)
	if err!= nil{
		log.Println(err)
		return nil,err
	}

	for _,result := range results{
		gIDs = append(gIDs, result.Game)
	}

	games, err := igdbConnection.Games.List(gIDs,options)
	if err != nil{
		log.Println(err)
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
		log.Println(err)
		return nil,err
	}

	for _,game := range games {
		for _,cover := range covers{

			if cover.ID == game.Cover{
				img,err := cover.SizedURL(igdb.Size1080p,1)
				if err != nil{
					log.Println(err)
					return nil,err
				}
				rGames = append(rGames, &models.GamesList{GameID: game.ID,Name: game.Name, Cover: img})
			}
		}
	}


	return rGames,nil
}