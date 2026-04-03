package models

import (
	"github.com/google/uuid"
	"time"
	"gorm.io/gorm"
)

type Company struct {
	ID				uuid.UUID		`gorm:"type:uuid;primaryKey"`
	UserID			uuid.UUID		`gorm:"type:uuid;uniqueIndex"`

	CompanyName		string			`gorm:"type:varchar(150)"`
	Phone			string			`gorm:"type:varchar(100)"`
	Address			string			`gorm:"type:text"`
	CreatedAt		time.Time		`gorm:"autoCreateTime"`	

	User			User			`gorm:"foreignKey:UserID;references:ID"`
}

func (u *Company) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}