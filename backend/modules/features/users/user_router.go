package users

import (
	"eksporin/modules/utils"
	"net/http"
)

func ProfileRouter(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		GetProfileHander(w, r)

	case http.MethodPut:
		UpdateProfileHandler(w, r)

	default:
		utils.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}
