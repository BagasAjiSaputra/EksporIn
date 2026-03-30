package migrations

import (
	"eksporin/config"
	"eksporin/models"
	"fmt"
)

func Migration() {
	config.DB.AutoMigrate(
		&models.User{},
	)

	fmt.Println("Migrate DB Sukses")
}
