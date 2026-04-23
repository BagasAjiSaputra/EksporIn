package admin

import (
	"github.com/google/uuid"
	"time"
)

type ApproveRequest struct {
	UserID		uuid.UUID	`json:"user_id"`
	Approve		bool		`json:"approve"`
}

type ApproveResponse struct {
	Message		string		`json:"message"`
	UserID		uuid.UUID	`json:"user_id"`
	Status		string		`json:"status"`
	Role		string		`json:"role"`
}

type AllUserData struct {
	ID			uuid.UUID	`json:"id"`
	Name		string		`json:"name"`
	Email		string		`json:"email"`
	Role		string		`json:"role"`
	IsVerified	string		`json:"is_verified"`
	IsRejected	bool		`json:"is_rejected"`
	CreatedAt	time.Time	`json:"created_at"`
	ResetToken	*string		`json:"reset_token"`
	ResetExp	*time.Time	`json:"reset_exp"`
}