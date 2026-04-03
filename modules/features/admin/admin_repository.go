package admin

import (
	"eksporin/config"
	"eksporin/models"
	"github.com/google/uuid"
)

func VerifyUser(user *models.User) error{
	return config.DB.Create(user).Error
}

func FindByID(id uuid.UUID) (*models.User, error) {
	var user models.User

	result := config.DB.Where("id = ?", id).First(&user)

	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}

func UpdateUser(user *models.User) error {
	return config.DB.Save(user).Error
}

func GetAllUser() ([]models.User, error) {
	var user []models.User

	result := config.DB.Find(&user).Error

	return user, result
}