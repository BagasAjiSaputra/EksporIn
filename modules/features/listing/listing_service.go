package listing 

import (
	"eksporin/models"
	// "errors"
	"github.com/google/uuid"
	"time"
)

func CreateListingService(input *CreateListingRequest) error {
	
	ListingInput := models.Listing{
		ID: uuid.New(),
		UserID: input.UserID,
		CommodityID: input.CommodityID,
		CompanyID: input.CompanyID,

		Title: input.Title,
		Description: input.Description,
		MinVolume: input.MinVolume,
		CurrentVolume: 0,
		Quality: input.Quality,
		PriceBuy: input.PriceBuy,
		Location: input.Location,
		Address: input.Address,
		Status: models.ListingPending,
		ExpiredAt: time.Now().AddDate(0, 0, 30),
	}

	err := CreateListing(&ListingInput)

	if err != nil {
		return err
	}

	return nil
}