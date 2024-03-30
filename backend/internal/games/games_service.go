package games

import (
	"log"

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

func (s *GamesService) GetAllGames() ([]models.GameReview, error) {
	// TODO: IGDB API call here (could make a new service for IGDB)
	return nil, nil
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
