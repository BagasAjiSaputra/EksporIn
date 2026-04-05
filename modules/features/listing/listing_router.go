package listing

import (
	"net/http"
)

func ListingRouter(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
		case http.MethodPost:
			CreateListingHandler(w, r)
	}

}
