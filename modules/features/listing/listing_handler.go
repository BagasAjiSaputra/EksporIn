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