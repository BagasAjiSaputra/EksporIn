package commodity

import (
	"eksporin/config"
	"eksporin/models"
	// "github.com/google/uuid"
)

func CreateCommodity(commodity *models.Commodity) error {
	return config.DB.Create(commodity).Error
}