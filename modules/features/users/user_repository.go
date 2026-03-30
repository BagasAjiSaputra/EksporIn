package users

import (
	"eksporin/config"
	"eksporin/models"
	"github.com/google/uuid"

)

func CreateUser(user *models.User) error{
	return config.DB.Create(user).Error
}

func FindByEmail(email string) *models.User{
	var user models.User

	result := config.DB.Where("email = ?", email).First(&user)

	if result.Error != nil {
		return nil
	}

	return &user
}

func FindByID(id uuid.UUID) (*models.User, error) {

	var user models.User

	result := config.DB.First(&user, id)

	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}

func UpdateUser(user *models.User) error {
	return config.DB.Save(user).Error
}