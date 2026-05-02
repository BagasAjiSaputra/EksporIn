package admin

import (
	// "eksporin/models"
	"eksporin/modules/middleware"
	"eksporin/modules/utils"
	"encoding/json"
	"net/http"
)

func AdminVerifyUser(w http.ResponseWriter, r *http.Request) {

	role, ok := r.Context().Value(middleware.UserRole).(string)

	if !ok || role != "admin" {
		utils.Error(w, "Forbidden Admin Only", http.StatusForbidden)
		return
	}

	var req ApproveRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		utils.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	user, err := AcceptVerifiedService(req.UserID, req.Approve)

	if err != nil {
		utils.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := ApproveResponse{
		Message: "User Verified",
		UserID:  user.ID,
		Status:  string(user.IsVerified),
		Role:    string(user.Role),
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func GetAllUserHandler(w http.ResponseWriter, r *http.Request) {
	role, ok := r.Context().Value(middleware.UserRole).(string)

	if !ok || role != "admin" {
		utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	users, err := GetAllUserService()

	if err != nil {
		utils.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var response []AllUserData

	for _, user := range users {
		response = append(response, AllUserData{
			ID:         user.ID,
			Name:       user.Name,
			Email:      user.Email,
			Role:       string(user.Role),
			IsVerified: string(user.IsVerified),
			IsRejected: user.IsRejected,
			CreatedAt:  user.CreatedAt,
			ResetToken: user.ResetToken,
			ResetExp:   user.ResetExp,
		})
	}

	json.NewEncoder(w).Encode(response)
}
