package commodity

import (
	"github.com/google/uuid"
)

type CreateCommodityRequest struct {
	Name		string		`json:"name"`
	Category	string		`json:"category"`
}

type CreateCommodityResponse struct {
	Message		string		`json:"message"`
	Name		string		`json:"name"`
	Category	string		`json:"category"`
}

type UpdateCommodityRequest struct {
	ID			uuid.UUID	`json:"id"`
	Name		string		`json:"name"`
	Category	string		`json:"category"`
}

type UpdateCommodityResponse struct {
	Message		string		`json:"message"`
	Name		string		`json:"name"`
	Category	string		`json:"category"`
}

type DeleteCommodityRequest struct {
	ID			uuid.UUID	`json:"id"`
}

type DeleteCommodityResponse struct {
	Message		string		`json:"message"`
	Name		string		`json:"name"`
	Category	string		`json:"category"`
}