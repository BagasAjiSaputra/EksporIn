package company

import "github.com/google/uuid"

type RegisterCompanyRequest struct {
	UserID		uuid.UUID		`json:"id"`
	CompanyName	string			`json:"company_name"`
	Phone		string			`json:"phone"`
	Address		string			`json:"address"`
}

type RegisterCompanyResponse struct {
	Message		string			`json:"message"`
}

type UpdateCompanyRequest struct {
	UserID		uuid.UUID		`json:"id"`
	CompanyName	string			`json:"company_name"`
	Phone		string			`json:"phone"`
	Address		string			`json:"address"`
}

type UpdateCompanyResponse struct {
	Message		string			`json:"message"`
	CompanyName	string			`json:"company_name"`
	Phone		string			`json:"phone"`
	Address		string			`json:"address"`
}