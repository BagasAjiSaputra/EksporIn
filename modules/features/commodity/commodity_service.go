package commodity

import (
	"eksporin/models"
	"errors"
	"github.com/google/uuid"
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

func UpdateCommodityService(id uuid.UUID, name string, category string) (*models.Commodity, error) {

	commodity, err := FindCommodity(id)

	if err != nil {
		return nil, errors.New("Komoditas Tidak Ditemukan")
	}

	commodity.Name = name
	commodity.Category = category

	err = UpdateCommodity(commodity)

	if err != nil {
		return nil, errors.New("Gagal Update Komoditas")
	}

	return commodity, nil
}

func DeleteCommodityService(id uuid.UUID) (*models.Commodity, error) {

	commodity, err := FindCommodity(id)

	if err != nil {
		return nil, errors.New("Komoditas Tidak Ditemukan")
	}

	err = DeleteCommodity(id)

	if err != nil {
		return nil, errors.New("Gagal Menghapus Komoditas")
	}

	return commodity, nil
}