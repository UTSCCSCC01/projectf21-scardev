package routes

import (
	"net/http"
	"openrun/helpers"

	"github.com/gorilla/mux"
)

type test struct {
	Name string
}
func InitRoutes(r *mux.Router) {
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		t := test{
			Name: "salik",
		}
		helpers.SendResponse(helpers.Success, t, 200, w)
	})
}