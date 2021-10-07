package main

import (
	"log"
	"net/http"

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
	log.Fatal(http.ListenAndServe(":8080", s.Router))
}
