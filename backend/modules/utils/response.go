package utils

import (
	"encoding/json"
	"net/http"
)

func JSON(w http.ResponseWriter, data interface{}, code int) {
	w.Header().Set("Content-Type", "Application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(data)
}

func Error(w http.ResponseWriter, message string, code int) {
	JSON(w, map[string]string{
		"error" : message,
	}, code)
}