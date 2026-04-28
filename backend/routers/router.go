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
	"os"

)

func Router() {

	root := http.NewServeMux()
	publicMux := http.NewServeMux()
	protectedMux := http.NewServeMux()

	// PUBLIC
	publicMux.HandleFunc("/register", users.CreateUserHandler)
	publicMux.HandleFunc("/login", users.LoginUserHandler)
	publicMux.HandleFunc("/token-reset", users.SendTokenResetHandler)
	publicMux.HandleFunc("/reset-password", users.ResetPasswordHandler)
	publicMux.HandleFunc("/listing", listing.GetAllListingHandler)

	// PROTECTED
	protectedMux.HandleFunc("/profile", users.ProfileRouter)
	protectedMux.HandleFunc("/verified", users.UpdateRequestVerified)
	protectedMux.HandleFunc("/company", company.CompanyRouter)
	protectedMux.HandleFunc("/manage-listing", listing.ListingRouter)

	// ADMIN
	protectedMux.HandleFunc("/commodity", commodity.CommodityRouter)
	protectedMux.HandleFunc("/users", admin.AdminRouter)
	protectedMux.HandleFunc("/approve", admin.AdminVerifyUser)

	root.Handle("/", middleware.Logger(publicMux))

	root.Handle("/api/", 
		middleware.Logger(
			http.StripPrefix(
				"/api",middleware.JWTAuth(protectedMux),
			),
		),
	)

	uploadPath := os.Getenv("UPLOAD_PATH")

	root.Handle("/uploads/",
		http.StripPrefix("/uploads/", 
			middleware.Logger(http.FileServer(http.Dir(uploadPath))),
		),
	)

	http.ListenAndServe(":8080", root)
}