package company

import (
	"eksporin/modules/middleware"
	"eksporin/modules/utils"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
)

func RegisterCompanyHandler(w http.ResponseWriter, r *http.Request) {

	var req RegisterCompanyRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		utils.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok {
		utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	_, err = RegisterCompanyService(userID, req.CompanyName, req.Phone, req.Address)

	if err != nil {
		utils.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := RegisterCompanyResponse{
		Message: "Berhasil Mendaftarkan Company",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func UpdateCompanyHandler(w http.ResponseWriter, r *http.Request) {
	var req UpdateCompanyRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		utils.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok {
		utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	company, err := UpdateCompanyService(userID, req.CompanyName, req.Phone, req.Address)

	if err != nil {
		utils.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := UpdateCompanyResponse{
		Message:     "Perusahaan Berhasil Di Update",
		CompanyName: company.CompanyName,
		Phone:       company.Phone,
		Address:     company.Address,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
