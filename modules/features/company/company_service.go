package company

import (
	"eksporin/models"
	"errors"

	"github.com/google/uuid"
)

func RegisterCompany(id uuid.UUID, name string, phone string, address string) (*models.Company, error) {

	user, err := FindByID(id)

	if err != nil {
		return nil, errors.New("User Hilang")
	}

	if user.IsVerified != models.Verified {
		return nil, errors.New("Belum Terverifikasi")
	}

	if id == uuid.Nil || name == "" || phone == "" || address == "" {
		return nil, errors.New("All Field Required")
	}

	company := &models.Company{
		UserID: id,
		CompanyName: name,
		Phone: phone,
		Address: address,
	}

	err = CreateCompany(company)

	if err != nil {
		return nil, errors.New("Failed Create Company")
	}

	return company, nil
}