package users

import (
	"eksporin/modules/middleware"
	"eksporin/modules/utils"
	"encoding/json"
	"net/http"
	"os"
	"image"
	"image/jpeg"
	_ "image/png"

	"github.com/google/uuid"
	"github.com/nfnt/resize"
)

func CreateUserHandler(w http.ResponseWriter, r *http.Request) {

	var req CreateUserRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		utils.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	user, err := RegisterUser(req.Name, req.Email, req.Password)

	if err != nil {
		utils.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := RegisterResponse{
		ID:         user.ID,
		Name:       user.Name,
		Email:      user.Email,
		Role:       string(user.Role),
		IsVerified: string(user.IsVerified),
		CreatedAt:  user.CreatedAt,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func LoginUserHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		utils.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	token, err := LoginUser(req.Email, req.Password)

	if err != nil {
		utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   false, // https true
		SameSite: http.SameSiteLaxMode,
	})

	response := LoginResponse{
		Message : "Login Berhasil",
		Token : token,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func GetProfileHander(w http.ResponseWriter, r *http.Request) {

	userID := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	user, err := GetUserByID(userID)

	if err != nil {
		utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	response := GetProfile{
		ID:         userID,
		Name:       user.Name,
		Email:      user.Email,
		Role:       string(user.Role),
		IsVerified: string(user.IsVerified),
		CreatedAt:  user.CreatedAt,
		UserImage:  user.UserImage,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func UpdateProfileHandler(w http.ResponseWriter, r *http.Request) {
	var req UpdateUserRequest

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

	user, err := UpdateUserByID(userID, req.Name, req.Email, req.Password, req.UserImage)

	if err != nil {
		utils.Error(w, "Gagal Update User", http.StatusInternalServerError)
		return
	}

	response := UpdateUserResponse{
		ID:        userID,
		Name:      user.Name,
		Email:     user.Email,
		Password:  user.Password,
		UserImage: user.UserImage,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func UpdateRequestVerified(w http.ResponseWriter, r *http.Request) {
	// var req UpdateIsVerified

	// err := json.NewDecoder(r.Body).Decode(&req)

	// if err != nil {
	// 	utils.Error(w, "Invalid Request", http.StatusBadRequest)
	// 	return
	// }

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok {
		utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	_, err := RequestVerified(userID)

	if err != nil {
		utils.Error(w, err.Error(), http.StatusBadRequest)
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
		utils.Error(w, "Invalid", http.StatusBadRequest)
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
		utils.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	_, err = UpdatePassword(req.Token, req.NewPassword)

	if err != nil {
		utils.Error(w, "Failed Update Password", http.StatusBadRequest)
		return
	}

	response := ResetPasswordResponse{
		Message: "Password Has been updated",
	}

	json.NewEncoder(w).Encode(response)
}

func Logout(w http.ResponseWriter, r *http.Request) {

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	})

	response := Response{
		Message: "Logout Berhasil",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func UploadProfileImageHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		utils.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20) // 10MB max
	if err != nil {
		utils.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	file, _, err := r.FormFile("image")
	if err != nil {
		utils.Error(w, "File image required", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Decode image
	img, _, err := image.Decode(file)
	if err != nil {
		utils.Error(w, "Format gambar tidak valid", http.StatusBadRequest)
		return
	}

	// Resize (max width 800px)
	resized := resize.Resize(800, 0, img, resize.Lanczos3)

	// Ensure upload directory exists
	uploadPath := os.Getenv("UPLOAD_PATH")
	if uploadPath == "" {
		uploadPath = "./storage/uploads"
	}
	if err := os.MkdirAll(uploadPath, os.ModePerm); err != nil {
		utils.Error(w, "Gagal membuat direktori upload", http.StatusInternalServerError)
		return
	}

	// Generate filename
	filename := uuid.New().String() + ".jpg"
	path := uploadPath + "/" + filename

	out, err := os.Create(path)
	if err != nil {
		utils.Error(w, "Gagal simpan file", http.StatusInternalServerError)
		return
	}
	defer out.Close()

	// Compress JPEG
	err = jpeg.Encode(out, resized, &jpeg.Options{
		Quality: 100,
	})
	if err != nil {
		utils.Error(w, "Gagal encode gambar", http.StatusInternalServerError)
		return
	}

	imageUrl := "/uploads/" + filename

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"image_url": imageUrl,
	})
}

func GetPublicUserHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		utils.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		utils.Error(w, "User ID is required", http.StatusBadRequest)
		return
	}

	id, err := uuid.Parse(idStr)
	if err != nil {
		utils.Error(w, "Invalid User ID format", http.StatusBadRequest)
		return
	}

	user, err := GetUserByID(id)
	if err != nil {
		utils.Error(w, "User tidak ditemukan", http.StatusNotFound)
		return
	}

	response := PublicUserResponse{
		ID:        user.ID,
		Name:      user.Name,
		UserImage: user.UserImage,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}