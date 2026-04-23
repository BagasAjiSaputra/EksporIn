package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type StatusListing string

const (
	ListingPending  StatusListing = "pending"
	ListingActive   StatusListing = "active"
	ListingComplete StatusListing = "completed"
	ListingExpired  StatusListing = "expired"
)

type Listing struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey;default:gen_random_uuid();"`
	UserID      uuid.UUID `gorm:"type:uuid;"`
	CommodityID uuid.UUID `gorm:"type:uuid;"`
	CompanyID   uuid.UUID `gorm:"type:uuid;"`

	Title         string        `gorm:"type:varchar(150);not null"`
	Description   string        `gorm:"type:varchar(3000);not null"`
	MinVolume     float64       `gorm:"type:decimal(15,2);not null"`
	CurrentVolume float64       `gorm:"type:decimal(15,2);default:0"`
	Quality       string        `gorm:"type:varchar(2000);"`
	PriceBuy      float64       `gorm:"type:decimal(15,2);not null"`
	Location      string        `gorm:"type:varchar(2000);not null"`
	Address       string        `gorm:"type:varchar(2000);not null"`
	CreatedAt     time.Time     `gorm:"autoCreateTime"`
	UpdatedAt     time.Time     `gorm:"autoCreateTime"`
	ExpiredAt     time.Time     `gorm:"autoCreateTime"`
	Status        StatusListing `gorm:"type:status_listing;default:'pending';"`

	User      User      `gorm:"foreignKey:UserID;references:ID"`
	Commodity Commodity `gorm:"foreignKey:CommodityID;references:ID"`
	Company   Company   `gorm:"foreignKey:CompanyID;references:ID"`
}

func (u *Listing) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}
