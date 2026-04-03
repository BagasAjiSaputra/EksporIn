package company

import (
	"eksporin/modules/middleware"
	"net/http"
	"encoding/json"
	"github.com/google/uuid"
)

func RegisterCompanyHandler(w http.ResponseWriter, r *http.Request) {

	var req RegisterCompanyRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok {
		http.Error(w, "Unauthorized", http.StatusBadRequest)
		return
	}

	_, err = RegisterCompany(userID, req.CompanyName, req.Phone, req.Addres)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := RegisterCompanyResponse{
		Message : "Berhasil Menambahkan Company",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

