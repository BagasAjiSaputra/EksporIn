package routers

import (
	"eksporin/modules/features/users"
	"eksporin/modules/features/admin"
	"eksporin/modules/middleware"
	// "eksporin/modules/middleware"
	"net/http"
)

func Router() {

	mux := http.NewServeMux()
	protectedMux := http.NewServeMux()

	// PUBLIC
	mux.HandleFunc("/register", users.CreateUserHandler)
	mux.HandleFunc("/login", users.LoginUserHandler)

	// PROTECTED
	protectedMux.HandleFunc("/profile", users.ProfileHandler)
	protectedMux.HandleFunc("/verified", users.UpdateRequestVerified)
	protectedMux.HandleFunc("/approve", admin.AdminVerifyUser)
	

	mux.Handle("/api/", http.StripPrefix("/api",middleware.JWTAuth(protectedMux)))

	http.ListenAndServe(":8080", mux)
}