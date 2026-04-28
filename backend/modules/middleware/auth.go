package middleware

import (
	"eksporin/modules/utils"
	"net/http"

	// "strings"
	"context"

	"github.com/google/uuid"
)

// Konteks Klaim JWT
type contextKey string

const (
	UserIDKey = contextKey("user_id")
	UserRole  = contextKey("role")
)

func JWTAuth(next http.Handler) http.Handler {

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// authHeader := r.Header.Get("Authorization")

		// if authHeader == "" {
		// 	utils.Error(w, "Unauthorized", http.StatusUnauthorized)
		// 	return
		// }

		// parts := strings.Split(authHeader, " ")

		// if len(parts) != 2 {
		// 	utils.Error(w, "Invalid Token Format", http.StatusBadRequest)
		// }

		// token := parts[1]
		cookie, err := r.Cookie("token")

		if err != nil {
			utils.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		token := cookie.Value

		claims, err := utils.ParseToken(token)

		if err != nil {
			utils.Error(w, "Invalid Token", http.StatusUnauthorized)
			return
		}

		// Ambil konteks Klaim JWT
		userIDString, ok := claims["user_id"].(string)

		if !ok {
			utils.Error(w, "Invalid Tokens", http.StatusUnauthorized)
			return
		}

		userID, err := uuid.Parse(userIDString)

		if err != nil {
			utils.Error(w, "Invalid UUID", http.StatusUnauthorized)
			return
		}

		role, ok := claims["role"].(string)
		if !ok {
			utils.Error(w, "No Roles", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserIDKey, userID)
		ctx = context.WithValue(ctx, UserRole, role)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
