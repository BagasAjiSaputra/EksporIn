package listing

import (
	"eksporin/modules/middleware"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
)

func CreateListingHandler(w http.ResponseWriter, r *http.Request) {

	var req CreateListingRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	role, ok := r.Context().Value(middleware.UserRole).(string)

	if !ok || role != "agregator" {
		http.Error(w, "Belum Terverifikasi", http.StatusUnauthorized)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	req.UserID = userID

	err = CreateListingService(&req) 

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := CreateListingResponse{
		Message: "Berhasil Menambahkan Listing",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func GetAllListingHandler(w http.ResponseWriter, r *http.Request) {

	listings, err := GetAllListingService()

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var response []AllListingData

	for _, listing := range listings {
		response = append(response, AllListingData {
			ID: listing.ID,
			UserID: listing.UserID,
			CommodityID: listing.CommodityID,
			CompanyID: listing.CompanyID,
			Title: listing.Title,
			Description: listing.Description,
			MinVolume: listing.MinVolume,
			CurrentVolume: listing.CurrentVolume,
			Quality: listing.Quality,
			PriceBuy: listing.PriceBuy,
			Location: listing.Location,
			Address: listing.Address,
			CreatedAt: listing.CreatedAt,
			UpdatedAt: listing.UpdatedAt,
			ExpiredAt: listing.ExpiredAt,
			Status: string(listing.Status),
		})
	}

	json.NewEncoder(w).Encode(response)

}