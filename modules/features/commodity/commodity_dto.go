package commodity


type CreateCommodityRequest struct {
	Name		string		`json:"name"`
	Category	string		`json:"category"`
}

type CreateCommodityResponse struct {
	Message		string		`json:"message"`
	Name		string		`json:"name"`
	Category	string		`json:"category"`
}