package games

import (
	"errors"
	"strings"

	"github.com/oskarilindroos/review-app/internal/models"
)

func (r MySQLGameReviewsRepository) Create(review models.GameReview) (int, error) {
	result, err := r.db.Exec("INSERT INTO game_reviews (igdb_id, user_id, review, rating) VALUES (?, ?, ?, ?)", review.IGDBID, review.UserID, review.Review, review.Rating)
	if err != nil {
		return 0, err
	}

	// Get the ID of the newly created review
	newReviewID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(newReviewID), nil
}

func (r *MySQLGameReviewsRepository) Delete(reviewID string) error {
	result, err := r.db.Exec("DELETE FROM game_reviews WHERE id = ?", reviewID)
	if err != nil {
		return err
	}

	// Check how many rows were affected
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	// If no rows were affected, the review was not found
	if rowsAffected == 0 {
		return errors.New("Review not found")
	}

	// Review successfully deleted
	return nil
}

func (r *MySQLGameReviewsRepository) Update(reviewID string, review models.GameReview) (models.GameReview, error) {
	var query string
	var args []any

	// Dynamically build the query based on the fields that are being updated
	if review.Review != "" {
		query += "review = ?, "
		args = append(args, review.Review)
	}

	if review.Rating != "" {
		query += "rating = ?, "
		args = append(args, review.Rating)
	}

	query = strings.TrimSuffix(query, ", ") // Remove the trailing comma and space
	query += " WHERE id = ?"
	args = append(args, reviewID)

	_, err := r.db.Exec("UPDATE game_reviews SET "+query, args...)
	if err != nil {
		return models.GameReview{}, err
	}

	// Get the updated review
	updatedReview, err := r.GetByID(reviewID)
	if err != nil {
		return models.GameReview{}, err
	}

	return updatedReview, nil
}

func (r *MySQLGameReviewsRepository) GetAll() ([]models.GameReview, error) {
	rows, err := r.db.Query("SELECT * FROM game_reviews")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	reviews := []models.GameReview{}
	for rows.Next() {
		var review models.GameReview
		err := rows.Scan(&review.ID, &review.IGDBID, &review.UserID, &review.Review, &review.Rating, &review.Created, &review.Updated)
		if err != nil {
			return nil, err
		}
		reviews = append(reviews, review)
	}

	return reviews, nil
}

func (r *MySQLGameReviewsRepository) GetByID(reviewID string) (models.GameReview, error) {
	var review models.GameReview

	err := r.db.QueryRow("SELECT * FROM game_reviews WHERE id = ?", reviewID).Scan(&review.ID, &review.IGDBID, &review.UserID, &review.Review, &review.Rating, &review.Created, &review.Updated)
	if err != nil {
		return models.GameReview{}, err
	}

	return review, nil
}

func (r *MySQLGameReviewsRepository) GetByIGDBID(igdbID string) ([]models.GameReview, error) {
	rows, err := r.db.Query("SELECT * FROM game_reviews WHERE igdb_id = ?", igdbID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	reviews := []models.GameReview{}
	for rows.Next() {
		var review models.GameReview
		err := rows.Scan(&review.ID, &review.IGDBID, &review.UserID, &review.Review, &review.Rating, &review.Created, &review.Updated)
		if err != nil {
			return nil, err
		}
		reviews = append(reviews, review)
	}

	return reviews, nil
}
