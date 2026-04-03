package commodity

import (
	"eksporin/models"
	"errors"
)

func CreateCommodityService(name string, category string) (*models.Commodity, error) {

	commodity := &models.Commodity{
		Name: name,
		Category: category,
	}

	err := CreateCommodity(commodity)

	if err != nil {
		return nil, errors.New("Gagal menambahkan Komoditas")
	}

	return commodity, nil
}