package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {

    http.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
				w.Header().Set("Access-Control-Allow-Origin", "*")
        fmt.Fprintf(w, "Hello, from the backend!")
    })


    log.Fatal(http.ListenAndServe(":8081", nil))

}