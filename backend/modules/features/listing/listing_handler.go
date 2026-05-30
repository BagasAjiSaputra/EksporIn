package listing

import (
	"eksporin/modules/middleware"
	"eksporin/modules/utils"
	"encoding/json"
	"net/http"

	"os"
	"strconv"

	"github.com/google/uuid"

	// "io"
	// "path/filepath"

	"image"
	"image/jpeg"
	_ "image/jpeg"
	_ "image/png"

	"github.com/nfnt/resize"
)

func CreateListingHandler(w http.ResponseWriter, r *http.Request) {

	// err := json.NewDecoder(r.Body).Decode(&req)
	err := r.ParseMultipartForm(10 << 20)

	if err != nil {
		utils.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	role, ok := r.Context().Value(middleware.UserRole).(string)

	if !ok || role != "agregator" {
		utils.Error(w, "Belum Terverifikasi", http.StatusUnauthorized)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok {
		utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req CreateListingRequest

	commodityIDStr := r.FormValue("commodity_id")
	commodityID, err := uuid.Parse(commodityIDStr)
	req.CommodityID = commodityID

	companyIDStr := r.FormValue("company_id")
	companyID, _ := uuid.Parse(companyIDStr)
	req.CompanyID = companyID

	req.Title = r.FormValue("title")
	req.Description = r.FormValue("description")
	req.Location = r.FormValue("location")
	req.Address = r.FormValue("address")

	minVolumeStr := r.FormValue("min_volume")
	minVolume, err := strconv.ParseFloat(minVolumeStr, 64)
	if err != nil {
		utils.Error(w, "Min volume tidak valid", http.StatusBadRequest)
		return
	}

	priceBuy, err := strconv.ParseFloat(r.FormValue("price_buy"), 64)
	if err != nil {
		utils.Error(w, "Harga tidak valid", http.StatusBadRequest)
		return
	}

	req.MinVolume = minVolume
	req.PriceBuy = priceBuy
	req.UserID = userID

	imageUrl := ""

	file, _, err := r.FormFile("image")
	if err == nil {
		defer file.Close()

		// Decode image
		img, format, err := image.Decode(file)
		if err != nil {
			utils.Error(w, "Format gambar tidak valid", http.StatusBadRequest)
			return
		}

		// Resize (max width 800px)
		resized := resize.Resize(800, 0, img, resize.Lanczos3)

		// Generate filename
		filename := uuid.New().String() + ".jpg"
		path := "./storage/uploads/" + filename

		out, err := os.Create(path)
		if err != nil {
			utils.Error(w, "Gagal simpan file", http.StatusInternalServerError)
			return
		}
		defer out.Close()

		// Compress JPEG (quality 75 = optimal)
		err = jpeg.Encode(out, resized, &jpeg.Options{
			Quality: 100,
		})
		if err != nil {
			utils.Error(w, "Gagal encode gambar", http.StatusInternalServerError)
			return
		}

		imageUrl = "/uploads/" + filename

		_ = format
	}

	req.ImageUrl = imageUrl

	err = CreateListingService(&req)

	if err != nil {
		utils.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := CreateListingResponse{
		Message: "Berhasil Menambahkan Listing",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func GetAllListingHandler(w http.ResponseWriter, r *http.Request) {

	listings, err := GetAllListingService()

	if err != nil {
		utils.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var response []AllListingData

	for _, listing := range listings {
		response = append(response, AllListingData{
			ID:            listing.ID,
			UserID:        listing.UserID,
			CommodityID:   listing.CommodityID,
			CompanyID:     listing.CompanyID,
			ImageUrl:      listing.ImageUrl,
			Title:         listing.Title,
			Description:   listing.Description,
			MinVolume:     listing.MinVolume,
			CurrentVolume: listing.CurrentVolume,
			Quality:       listing.Quality,
			PriceBuy:      listing.PriceBuy,
			Location:      listing.Location,
			Address:       listing.Address,
			CreatedAt:     listing.CreatedAt,
			UpdatedAt:     listing.UpdatedAt,
			ExpiredAt:     listing.ExpiredAt,
			Status:        string(listing.Status),
		})
	}

	json.NewEncoder(w).Encode(response)

}

func GetListingByIDHandler(w http.ResponseWriter, r *http.Request) {

	// var req GetListingIDRequest

	// err := json.NewDecoder(r.Body).Decode(&req)

	// if err != nil {
	// 	utils.Error(w, "Invalid Request", http.StatusBadRequest)
	// 	return
	// }

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok {
		utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	listings, err := GetListingByIDService(userID)

	if err != nil {
		utils.Error(w, "Listing Tidak Ditemukan", http.StatusBadRequest)
		return
	}

	var response []GetListingID

	for _, listing := range listings {
		response = append(response, GetListingID{

			ID:            listing.ID,
			UserID:        listing.UserID,
			CommodityID:   listing.CommodityID,
			CompanyID:     listing.CompanyID,
			ImageUrl:      listing.ImageUrl,
			Title:         listing.Title,
			Description:   listing.Description,
			MinVolume:     listing.MinVolume,
			CurrentVolume: listing.CurrentVolume,
			Quality:       listing.Quality,
			PriceBuy:      listing.PriceBuy,
			Location:      listing.Location,
			Address:       listing.Address,
			CreatedAt:     listing.CreatedAt,
			UpdatedAt:     listing.UpdatedAt,
			ExpiredAt:     listing.ExpiredAt,
			Status:        string(listing.Status),
		})
	}

	w.Header().Set("Content-Type", "Application/json")
	json.NewEncoder(w).Encode(response)

}

func UpdateListingHandler(w http.ResponseWriter, r *http.Request) {

	err := r.ParseMultipartForm(10 << 20)

	if err != nil {
		utils.Error(w, "Invalid Request", http.StatusBadRequest)
		return
	}

	role, ok := r.Context().Value(middleware.UserRole).(string)

	if !ok || role != "agregator" {
		utils.Error(w, "Belum Terverifikasi", http.StatusUnauthorized)
		return
	}

	userID, ok := r.Context().Value(middleware.UserIDKey).(uuid.UUID)

	if !ok {
		utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req UpdateListingRequest

	listingIDStr := r.FormValue("id")
	if listingIDStr == "" {
		utils.Error(w, "Listing ID is required", http.StatusBadRequest)
		return
	}
	listingID, err := uuid.Parse(listingIDStr)
	if err != nil {
		utils.Error(w, "Invalid Listing ID", http.StatusBadRequest)
		return
	}

	req.ID = listingID
	req.UserID = userID

	commodityIDStr := r.FormValue("commodity_id")
	if commodityIDStr != "" {
		commodityID, err := uuid.Parse(commodityIDStr)
		if err == nil {
			req.CommodityID = commodityID
		}
	}

	companyIDStr := r.FormValue("company_id")
	if companyIDStr != "" {
		companyID, err := uuid.Parse(companyIDStr)
		if err == nil {
			req.CompanyID = companyID
		}
	}

	req.Title = r.FormValue("title")
	req.Description = r.FormValue("description")
	req.Location = r.FormValue("location")
	req.Address = r.FormValue("address")
	req.Quality = r.FormValue("quality")
	req.Status = r.FormValue("status")

	minVolumeStr := r.FormValue("min_volume")
	if minVolumeStr != "" {
		minVolume, err := strconv.ParseFloat(minVolumeStr, 64)
		if err == nil {
			req.MinVolume = minVolume
		}
	}

	priceBuyStr := r.FormValue("price_buy")
	if priceBuyStr != "" {
		priceBuy, err := strconv.ParseFloat(priceBuyStr, 64)
		if err == nil {
			req.PriceBuy = priceBuy
		}
	}

	imageUrl := ""

	file, _, err := r.FormFile("image")
	if err == nil {
		defer file.Close()

		// Decode image
		img, format, err := image.Decode(file)
		if err != nil {
			utils.Error(w, "Format gambar tidak valid", http.StatusBadRequest)
			return
		}

		// Resize (max width 800px)
		resized := resize.Resize(800, 0, img, resize.Lanczos3)

		// Generate filename
		filename := uuid.New().String() + ".jpg"
		path := "./storage/uploads/" + filename

		out, err := os.Create(path)
		if err != nil {
			utils.Error(w, "Gagal simpan file", http.StatusInternalServerError)
			return
		}
		defer out.Close()

		// Compress JPEG (quality 75 = optimal)
		err = jpeg.Encode(out, resized, &jpeg.Options{
			Quality: 100,
		})
		if err != nil {
			utils.Error(w, "Gagal encode gambar", http.StatusInternalServerError)
			return
		}

		imageUrl = "/uploads/" + filename
		_ = format
	}

	req.ImageUrl = imageUrl

	err = UpdateListingService(&req)

	if err != nil {
		utils.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := UpdateListingResponse{
		Message: "Berhasil Mengupdate Listing",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
