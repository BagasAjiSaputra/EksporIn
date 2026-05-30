package listing

import (
	"eksporin/models"
	"errors"
	"time"

	"github.com/google/uuid"
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
		ID:          uuid.New(),
		UserID:      input.UserID,
		CommodityID: input.CommodityID,
		CompanyID:   input.CompanyID,

		ImageUrl:      input.ImageUrl,
		Title:         input.Title,
		Description:   input.Description,
		MinVolume:     input.MinVolume,
		CurrentVolume: 0,
		Quality:       input.Quality,
		PriceBuy:      input.PriceBuy,
		Location:      input.Location,
		Address:       input.Address,
		Status:        models.ListingPending,
		ExpiredAt:     time.Now().AddDate(0, 0, 30),
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

func GetListingByIDService(id uuid.UUID) ([]models.Listing, error) {

	var listing, err = GetListingByID(id)

	if err != nil {
		return nil, errors.New("Gagal mengambil data listing User")
	}

	return listing, nil
}

func UpdateListingService(input *UpdateListingRequest) error {
	if input.ID == uuid.Nil {
		return errors.New("Listing ID Invalid")
	}

	listing, err := GetListingByListingID(input.ID)
	if err != nil {
		return errors.New("Listing tidak ditemukan")
	}

	// Verify UserID owns this listing
	if listing.UserID != input.UserID {
		return errors.New("Unauthorized to update this listing")
	}

	if input.CommodityID != uuid.Nil {
		listing.CommodityID = input.CommodityID
	}
	if input.CompanyID != uuid.Nil {
		listing.CompanyID = input.CompanyID
	}
	if input.Title != "" {
		listing.Title = input.Title
	}
	if input.Description != "" {
		listing.Description = input.Description
	}
	if input.MinVolume > 0 {
		listing.MinVolume = input.MinVolume
	}
	if input.PriceBuy > 0 {
		listing.PriceBuy = input.PriceBuy
	}
	if input.Location != "" {
		listing.Location = input.Location
	}
	if input.Address != "" {
		listing.Address = input.Address
	}
	if input.Quality != "" {
		listing.Quality = input.Quality
	}
	if input.ImageUrl != "" {
		listing.ImageUrl = input.ImageUrl
	}
	if input.Status != "" {
		listing.Status = models.StatusListing(input.Status)
	}

	err = UpdateListing(listing)
	if err != nil {
		return err
	}

	return nil
}
