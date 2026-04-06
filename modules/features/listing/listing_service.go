package listing 

import (
	"eksporin/models"
	"errors"
	"github.com/google/uuid"
	"time"
)

func CreateListingService(input *CreateListingRequest) error {

	if input.UserID == uuid.Nil {
		return errors.New("User Invalid")
	}

	if input.CommodityID == uuid.Nil {
		return errors.New("Komoditas Invalid")
	}

	if input.CompanyID == uuid.Nil {
		return errors.New("Perusahaan Invalid")
	}

	if input.Title == "" {
		return errors.New("Judul wajib diisi")
	}

	if input.Description == "" {
		return errors.New("Deskripsi wajib diisi")
	}

	if input.MinVolume <= 0 {
		return errors.New("Satuan berat harus valid")
	}

	if input.PriceBuy == 0 {
		return errors.New("Harga tidak valid")
	}

	if input.Location == "" {
		return errors.New("Lokasi harus ditentukan")
	}

	if input.Address == "" {
		return errors.New("Alamat harus ditentukan")
	}

	
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

func GetAllListingService() ([]models.Listing, error) {

	listing, err := GetAllListing()

	if err != nil {
		return nil, errors.New("Gagal mengambil listing")
	}

	return listing, nil
}