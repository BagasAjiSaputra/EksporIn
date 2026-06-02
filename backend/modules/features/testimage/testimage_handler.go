package testimage

import (
	"eksporin/modules/utils"
	"log"
	"net/http"
	"os"
)

func GetTestImageHandler(w http.ResponseWriter, r *http.Request) {
	uploadPath := os.Getenv("UPLOAD_PATH")
	if uploadPath == "" {
		uploadPath = "./storage/uploads"
	}

	files, err := os.ReadDir(uploadPath)
	if err != nil {
		log.Println("Error ReadDir:", err, "Path:", uploadPath)
		utils.Error(w, "Failed to read upload directory: "+err.Error()+" | Path: "+uploadPath, http.StatusInternalServerError)
		return
	}

	images := []string{}
	for _, file := range files {
		if !file.IsDir() {
			images = append(images, "/uploads/"+file.Name())
		}
	}

	utils.JSON(w, map[string]interface{}{
		"message": "Success getting images for test",
		"images":  images,
	}, http.StatusOK)
}

func TestImageRouter(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		GetTestImageHandler(w, r)
	default:
		utils.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}
