package admin

import (
	// "eksporin/models"
	"eksporin/modules/middleware"
	"encoding/json"
	"net/http"
)

func AdminVerifyUser(w http.ResponseWriter, r *http.Request) {

	role, ok := r.Context().Value(middleware.UserRole).(string)

	if !ok || role != "admin" {
		http.Error(w, "Forbidden Admin Only", http.StatusForbidden)
		return
	}

	var req ApproveRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	user, err := AcceptVerified(req.UserID, req.Approve) 

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := ApproveResponse{
		Message : "User Verified",
		UserID: user.ID,
		Status: string(user.IsVerified),
		Role : string(user.Role),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}