package listing

import (
	"eksporin/config"
	"eksporin/models"
)

func CreateListing(listing *models.Listing) error {
	return config.DB.Create(listing).Error
}

func GetAllListing() ([]models.Listing, error) {
	
	var listing []models.Listing

	result := config.DB.Find(&listing).Error

	return listing, result
}
