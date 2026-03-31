package main

import (
	"eksporin/config"
	"eksporin/routers"
	"eksporin/migrations"
	"github.com/joho/godotenv"
)

func main() {
	
	godotenv.Load()
	config.ConnectDB()
	migrations.Migration()

	routers.Router()
}