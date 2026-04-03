package company

import "github.com/google/uuid"

type RegisterCompanyRequest struct {
	ID			uuid.UUID		`json:"id"`
	CompanyName	string			`json:"company_name"`
	Phone		string			`json:"phone"`
	Addres		string			`json:"address"`
}

type RegisterCompanyResponse struct {
	Message		string			`json:"message"`
}