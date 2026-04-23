package models

import (
	"github.com/google/uuid"
	// "time"
	"gorm.io/gorm"
)

type Commodity struct {
	ID				uuid.UUID		`gorm:"type:uuid;primaryKey;default:gen_random_uuid();"`
	Name			string			`gorm:"type:varchar(150);uniqueIndex;not null"`
	Category		string			`gorm:"type:varchar(150);not null"`
}

func (u *Commodity) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}