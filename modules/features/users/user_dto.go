package users

import (
	"time"
	"github.com/google/uuid"
)

type CreateUserRequest struct {
	Email		string		`json:"email"`
	Password	string		`json:"password"`
}

type LoginRequest struct {
	Email		string		`json:"email"`
	Password	string		`json:"password"`
}

type LoginResponse struct {
	Token 		string		`json:"token"`
}

type GetProfile struct {
	ID			uuid.UUID	`gorm:"primarykey"`
	Name		string		`gorm:"type:varchar(255);not null"`
	Email		string		`gorm:"unique; not null"`
	CreatedAt	time.Time	`gorm:"autoCreateTime;default:now()"`
}

type UpdateUserRequest struct {
	Name	string			`json:"name"`
	Email		string		`json:"email"`
	Password	string		`json:"password"`
}

type UpdateUserResponse struct {
	ID			uuid.UUID		`json:"id"`
	Name		string		`json:"name"`
	Email		string		`json:"email"`
	Password	string		`json:"password"`
}