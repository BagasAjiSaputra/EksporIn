package migrations

import (
	"eksporin/config"
	"eksporin/models"
	"fmt"
)

func Migration() {
	err := config.DB.AutoMigrate(
		&models.User{},
	)

	if err != nil {
		fmt.Println(err.Error())
	}

	

	fmt.Println("Migrate DB Sukses")
}
