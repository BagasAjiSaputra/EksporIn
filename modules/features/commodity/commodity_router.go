package commodity

import (
	"net/http"
)

func CommodityRouter(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
		case http.MethodPost:
			CreateCommodityHandler(w, r)

		default:
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}