package users

import (
	"encoding/json"
	"net/http"
	"eksporin/modules/middleware"
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

	res := LoginResponse{
		Token : token,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
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