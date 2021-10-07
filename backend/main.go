package main

import (
	"openrun/db"
	"os"
)

func main() {
	err := db.Init(os.Getenv("MONGO_URI"), os.Getenv("MONGO_DB_NAME"))

	if err != nil {
		panic(err)
	}
	server := New()
	server.Run()
}