package company

import (
	"net/http"
)

func CompanyRouter(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
		case http.MethodPost:
			RegisterCompanyHandler(w, r)
		case http.MethodPut:
			UpdateCompanyHandler(w, r)
		default:
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}

}