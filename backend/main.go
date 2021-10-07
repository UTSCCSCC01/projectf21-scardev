package main

import (
	"log"
	"openrun/db"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	log.Println("loading environment and initiating db...")
	err := godotenv.Load()

	if err != nil {
		panic(err)
	}

	err = db.Init(os.Getenv("MONGO_URI"), os.Getenv("MONGO_DB_NAME"))

	if err != nil {
		panic(err)
	}

	log.Println("starting server...")
	server := New()
	server.Run()
}