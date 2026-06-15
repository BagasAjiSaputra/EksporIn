package users

import (
	"time"
	"github.com/google/uuid"
)

type CreateUserRequest struct {
	Name		string		`json:"name"`
	Email		string		`json:"email"`
	Password	string		`json:"password"`
}

type RegisterResponse struct {
	ID			uuid.UUID	`json:"id"`
	Name		string		`json:"name"`
	Email		string		`json:"email"`
	Role		string		`json:"role"`
	IsVerified	string		`json:"is_verified"`
	CreatedAt	time.Time	`json:"created_at"`
}

type LoginRequest struct {
	Email		string		`json:"email"`
	Password	string		`json:"password"`
}

type LoginResponse struct {
	Message		string		`json:"message"`
	Token		string		`json:"token"`
}

type GetProfile struct {
	ID			uuid.UUID	`json:"id"`
	Name		string		`json:"name"`
	Email		string		`json:"email"`
	Role		string		`json:"role"`
	IsVerified	string		`json:"is_verified"`
	CreatedAt	time.Time	`json:"created_at"`
	UserImage	string		`json:"user_image"`
}

type UpdateUserRequest struct {
	Name		string		`json:"name"`
	Email		string		`json:"email"`
	Password	string		`json:"password"`
	UserImage	string		`json:"user_image"`
}

type UpdateUserResponse struct {
	ID			uuid.UUID	`json:"id"`
	Name		string		`json:"name"`
	Email		string		`json:"email"`
	Password	string		`json:"password"`
	UserImage	string		`json:"user_image"`
}

type UpdateIsVerified struct {
	ID			uuid.UUID	`json:"id"`
}

type UpdateIsVerifiedResponse struct {
	Message		string		`json:"message"`
}

type SendResetTokenRequest struct {
	Email		string		`json:"email"`
}
type ResetTokenResponse struct {
	Message		string		`json:"message"`
}

type ResetPasswordRequest struct {
	Token		string		`json:"token"`
	NewPassword	string		`json:"new_password"`
}

type ResetPasswordResponse struct {
	Message		string		`json:"message"`
}

type Response struct {
	Message string `json:"message"`
}