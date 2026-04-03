package company

import (
	"eksporin/config"
	"eksporin/models"
	"github.com/google/uuid"
)

func CreateCompany(company *models.Company) error {
	return config.DB.Create(company).Error
}

func FindByID(id uuid.UUID) (*models.User, error) {
	var user models.User

	result := config.DB.Where("id = ?", id).First(&user)

	if result.Error != nil {
		return nil, result.Error
	}

	return &user, nil
}