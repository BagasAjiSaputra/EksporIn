package company

import (
	"eksporin/modules/utils"
	"net/http"
)

func CompanyRouter(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case http.MethodGet:
		GetCompanyHandler(w, r)
	case http.MethodPost:
		RegisterCompanyHandler(w, r)
	case http.MethodPut:
		UpdateCompanyHandler(w, r)
	default:
		utils.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}

}
