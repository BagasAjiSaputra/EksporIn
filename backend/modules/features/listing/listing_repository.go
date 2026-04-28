package listing

import (
	"eksporin/config"
	"eksporin/models"
	"github.com/google/uuid"
)

func CreateListing(listing *models.Listing) error {
	return config.DB.Create(listing).Error
}

func GetAllListing() ([]models.Listing, error) {
	
	var listing []models.Listing

	result := config.DB.Find(&listing).Error

	return listing, result
}

func GetListingByID(id uuid.UUID) ([]models.Listing, error) {

	var listing []models.Listing

	result := config.DB.Where("user_id = ?", id).Find(&listing)

	if result.Error != nil {
		return nil, result.Error
	}

	return listing, nil
}