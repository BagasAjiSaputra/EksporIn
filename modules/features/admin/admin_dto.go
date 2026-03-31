package admin

import "github.com/google/uuid"

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