package main

import (
	"log"
	"net/http"
	"os"

	"openrun/routes"

	"github.com/gorilla/mux"
)

type Server struct {
	Router *mux.Router
}

func New() *Server {
	r := mux.NewRouter()
	s := &Server{
		Router: r,
	}
	routes.InitRoutes(r)
	return s
}

func (s *Server) Run() {
	port := os.Getenv("OPENRUN_PORT")
	log.Println("server listening on port "+port)
	log.Fatal(http.ListenAndServe(":"+port, s.Router))
}
