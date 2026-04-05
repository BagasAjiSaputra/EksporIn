package listing

import (
	"eksporin/config"
	"eksporin/models"
	
)

func CreateListing(listing *models.Listing) error {
	return config.DB.Create(listing).Error
}
