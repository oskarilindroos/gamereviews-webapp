package games

import (
	"database/sql"

	"github.com/oskarilindroos/review-app/internal/models"
)

// NOTE: Using the Repository pattern to abstract the database layer
type GameReviewsRepository interface {
	Create(review models.GameReview) (int, error)
	Update(reviewID string, review models.GameReview) (models.GameReview, error)
	Delete(reviewID string) error
	GetAll() ([]models.GameReview, error)
	GetByID(reviewID string) (models.GameReview, error)
	GetByIGDBID(igdbID string) ([]models.GameReview, error)
}

// MySQL implementation of the GameReviewsRepository
type MySQLGameReviewsRepository struct {
	db *sql.DB
}

func NewMYSQLGameReviewsRepository(db *sql.DB) *MySQLGameReviewsRepository {
	return &MySQLGameReviewsRepository{
		db: db,
	}
}
