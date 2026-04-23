package commodity

import (
	"eksporin/modules/middleware"
	"net/http"
	"encoding/json"
)

func CreateCommodityHandler(w http.ResponseWriter, r *http.Request) {

	var req CreateCommodityRequest

	role, ok := r.Context().Value(middleware.UserRole).(string)

	if !ok || role != "admin"{
		http.Error(w, "Forbidden Request", http.StatusForbidden)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	_, err = CreateCommodityService(req.Name, req.Category)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := CreateCommodityResponse{
		Message: "Komoditas Berhasil Ditambahkan",
		Name: req.Name,
		Category: req.Category,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func UpdateCommodityHandler(w http.ResponseWriter, r *http.Request) {
	var req UpdateCommodityRequest

	role, ok := r.Context().Value(middleware.UserRole).(string)

	if !ok || role != "admin" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	commodity, err := UpdateCommodityService(req.ID, req.Name, req.Category)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := UpdateCommodityResponse{
		Message: "Komoditas Berhasil Di Update",
		Name: commodity.Name,
		Category: commodity.Category,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func DeleteCommodityHandler(w http.ResponseWriter, r *http.Request) {

	var req DeleteCommodityRequest

	role, ok := r.Context().Value(middleware.UserRole).(string)

	if !ok || role != "admin" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	commodity, err := DeleteCommodityService(req.ID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := DeleteCommodityResponse{
		Message: "Komoditas Dihapus",
		Name: commodity.Name,
		Category: commodity.Category,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}