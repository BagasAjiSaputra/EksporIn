package models

import (
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

// Enum User Role
type UserRole string
const (
	RoleAdmin 		UserRole = "admin"
	RoleAgregator 	UserRole = "agregator"
	RoleUser 		UserRole = "user"
)

type Verify string
const (
	None		Verify	= "none"
	Pending		Verify	= "pending"
	Verified	Verify	= "verified"
	Rejected	Verify	= "rejected"
)

type User struct {
	ID			uuid.UUID	`gorm:"type:uuid;primaryKey"`
	Name		string		`gorm:"type:varchar(255)"`
	Email		string		`gorm:"unique; not null"`
	Password	string		`gorm:"not null"`
	Role		UserRole	`gorm:"type:user_role;default:'user'"`
	IsVerified	Verify		`gorm:"type:verify;default:'none'"`
	IsRejected	bool		`gorm:"default:false;"`
	CreatedAt	time.Time	`gorm:"autoCreateTime"`
	ResetToken	*string		`gorm:"unique;default:null"`
	ResetExp	*time.Time	`gorm:"default:null"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID = uuid.New()
	return
}