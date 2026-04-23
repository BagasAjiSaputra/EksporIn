package company

import (
	"eksporin/models"
	"errors"

	"github.com/google/uuid"
)

func RegisterCompanyService(user_id uuid.UUID, name string, phone string, address string) (*models.Company, error) {

	user, err := FindByID(user_id)

	if err != nil {
		return nil, errors.New("User Hilang")
	}

	if user.IsVerified != models.Verified {
		return nil, errors.New("Belum Terverifikasi")
	}

	if user_id == uuid.Nil || name == "" || phone == "" || address == "" {
		return nil, errors.New("All Field Required")
	}

	company := &models.Company{
		UserID: user_id,
		CompanyName: name,
		Phone: phone,
		Address: address,
	}

	err = CreateCompany(company)

	if err != nil {
		return nil, errors.New("Gagal Mendaftarkan Perusahaan")
	}

	return company, nil
}

func UpdateCompanyService(user_id uuid.UUID, name string, phone string, address string) (*models.Company, error) {
	company, err := FindCompany(user_id)

	if err != nil {
		return nil, errors.New("Perusahaan Tidak Ditemukan")
	}


	if user_id == uuid.Nil || name == "" || phone == "" || address == "" {
		return nil, errors.New("All Field Required")
	}

	company.CompanyName = name
	company.Phone = phone
	company.Address = address


	err = UpdateCompany(company)

	if err != nil {
		return nil, errors.New("Gagal Update Perusahaan")
	}

	return company, nil
}