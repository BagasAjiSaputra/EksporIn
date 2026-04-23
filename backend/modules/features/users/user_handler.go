package users

import (
	"eksporin/modules/middleware"
	// "eksporin/modules/utils"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
)


func CreateUserHandler(w http.ResponseWriter, r *http.Request) {

	var req CreateUserRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	user, err := RegisterUser(req.Name, req.Email, req.Password)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := RegisterResponse {
		ID : user.ID,
		Name : user.Name,
		Email : user.Email,
		Role : string(user.Role),
		IsVerified: string(user.IsVerified),
		CreatedAt: user.CreatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func LoginUserHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
	}

	token, err := LoginUser(req.Email, req.Password)

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
	}

	http.SetCookie(w, &http.Cookie{
		Name : "token",
		Value : token,
		Path : "/",
		HttpOnly: true,
		Secure: false, // https true
		SameSite: http.SameSiteLaxMode,

	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "login success",
	})
}

func GetProfileHander(w http.ResponseWriter, r *http.Request) {
	
	userID := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	user, err := GetUserByID(userID)

	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	response := GetProfile{
		ID : userID,
		Name : user.Name,
		Email : user.Email,
		Role : string(user.Role),
		IsVerified: string(user.IsVerified),
		CreatedAt: user.CreatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func UpdateProfileHandler(w http.ResponseWriter, r *http.Request) {
	var req UpdateUserRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	user, err := UpdateUserByID(userID, req.Name, req.Email, req.Password)

	if err != nil {
		http.Error(w, "Gagal Update User", http.StatusInternalServerError)
		return
	}

	response := UpdateUserResponse {
		ID : userID,
		Name : user.Name,
		Email: user.Email,
		Password: user.Password,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func UpdateRequestVerified(w http.ResponseWriter, r *http.Request) {
	// var req UpdateIsVerified

	// err := json.NewDecoder(r.Body).Decode(&req)

	// if err != nil {
	// 	http.Error(w, "Invalid Request", http.StatusBadRequest)
	// 	return
	// }

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok  {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	_, err := RequestVerified(userID)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := UpdateIsVerifiedResponse{
		Message: "Request Verified Has Been Send",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func SendTokenResetHandler(w http.ResponseWriter, r *http.Request) {
	var req SendResetTokenRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid", http.StatusBadRequest)
		return 
	}

	user, _ := RequestResetPassword(req.Email)

	if user != "" {
		//Link reset token
		
	}

	response := ResetTokenResponse{
		Message: "Link Reset has been Sent",
	}

	json.NewEncoder(w).Encode(response)
}

func ResetPasswordHandler(w http.ResponseWriter, r *http.Request) {
	var req ResetPasswordRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	_, err = UpdatePassword(req.Token, req.NewPassword)

	if err != nil {
		http.Error(w, "Failed Update Password", http.StatusBadRequest)
		return
	}

	response := ResetPasswordResponse{
		Message:"Password Has been updated",
	}

	json.NewEncoder(w).Encode(response)
}