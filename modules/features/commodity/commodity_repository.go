package commodity

import (
	"eksporin/config"
	"eksporin/models"
	"github.com/google/uuid"
)

func CreateCommodity(commodity *models.Commodity) error {
	return config.DB.Create(commodity).Error
}

func FindCommodity(id uuid.UUID) (*models.Commodity, error) {
	var commodity models.Commodity

	result := config.DB.Where("id = ?", id).First(&commodity)

	if result.Error != nil {
		return nil, result.Error
	}

	return &commodity, nil
}

func UpdateCommodity(commodity *models.Commodity) error {
	return config.DB.Save(commodity).Error
}

func DeleteCommodity(id uuid.UUID) error {
	return config.DB.Delete(&models.Commodity{}, "id = ?", id).Error
}