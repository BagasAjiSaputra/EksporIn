package admin

import (
	"net/http"
)

func AdminRouter(w http.ResponseWriter, r *http.Request) {

	switch r.Method{
		case http.MethodGet:
			GetAllUserHandler(w, r)

		default:
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}

}