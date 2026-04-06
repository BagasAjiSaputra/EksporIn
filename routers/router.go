package routers

import (
	"eksporin/modules/features/admin"
	"eksporin/modules/features/commodity"
	"eksporin/modules/features/company"
	"eksporin/modules/features/listing"

	// "eksporin/modules/features/listing"
	"eksporin/modules/features/users"
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
	mux.HandleFunc("/token-reset", users.SendTokenResetHandler)
	mux.HandleFunc("/reset-password", users.ResetPasswordHandler)
	mux.HandleFunc("/listing", listing.GetAllListingHandler)

	// PROTECTED
	protectedMux.HandleFunc("/profile", users.ProfileRouter)
	protectedMux.HandleFunc("/verified", users.UpdateRequestVerified)
	protectedMux.HandleFunc("/company", company.CompanyRouter)
	protectedMux.HandleFunc("/manage-listing", listing.ListingRouter)

	// ADMIN
	protectedMux.HandleFunc("/commodity", commodity.CommodityRouter)
	protectedMux.HandleFunc("/users", admin.AdminRouter)
	protectedMux.HandleFunc("/approve", admin.AdminVerifyUser)

	mux.Handle("/api/", http.StripPrefix("/api",middleware.JWTAuth(protectedMux)))

	http.ListenAndServe(":8080", mux)
}