package listing

import (
	"time"

	"github.com/google/uuid"
)

type CreateListingRequest struct {
	ID          uuid.UUID `json:"id"`
	UserID      uuid.UUID `json:"user_id"`
	CommodityID uuid.UUID `json:"commodity_id"`
	CompanyID   uuid.UUID `json:"company_id"`

	Title         string    `json:"title"`
	Description   string    `json:"description"`
	MinVolume     float64   `json:"min_volume"`
	CurrentVolume float64   `json:"current_volume"`
	Quality       string    `json:"quality"`
	PriceBuy      float64   `json:"price_buy"`
	Location      string    `json:"location"`
	Address       string    `json:"address"`
	// CreatedAt     time.Time `json:"created_at"`
	// UpdatedAt     time.Time `json:"updated_at"`
	// ExpiredAt     time.Time `json:"expired_at"`
	Status        string    `json:"status"`
}

type CreateListingResponse struct{
	Message		string		`json:"message"`
}

type AllListingData struct {
	ID          uuid.UUID `json:"id"`
	UserID      uuid.UUID `json:"user_id"`
	CommodityID uuid.UUID `json:"commodity_id"`
	CompanyID   uuid.UUID `json:"company_id"`

	Title         string        `json:"title"`
	Description   string        `json:"description"`
	MinVolume     float64       `json:"min_volume"`
	CurrentVolume float64       `json:"current_volume"`
	Quality       string        `json:"quality"`
	PriceBuy      float64       `json:"price_buy"`
	Location      string        `json:"location"`
	Address       string        `json:"address"`
	CreatedAt     time.Time     `json:"created_at"`
	UpdatedAt     time.Time     `json:"updated_at"`
	ExpiredAt     time.Time     `json:"expired_at"`
	Status        string `json:"status"`
}

type GetListingIDRequest struct {
	ID uuid.UUID	`json:"id"`
}