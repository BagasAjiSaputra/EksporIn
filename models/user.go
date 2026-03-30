package models

import (
	"time"
	"github.com/google/uuid"
	// "gorm.io/gorm"
)

type User struct {
	ID			uuid.UUID	`gorm:"type:uuid;primarykey"`
	Name		string		`gorm:"type:varchar(255);not null"`
	Email		string		`gorm:"unique; not null"`
	Password	string		`gorm:"not null"`
	CreatedAt	time.Time	`gorm:"autoCreateTime;default:now()"`
}

// func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
// 	u.ID = uuid.New()
// 	return
// }