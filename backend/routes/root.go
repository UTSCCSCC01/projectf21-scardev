package routes

import (
	"net/http"
	"openrun/controller"
	"openrun/helpers"
	"openrun/middleware"

	"github.com/gorilla/mux"
)

type test struct {
	Name string
}
func testProtected(w http.ResponseWriter, r *http.Request) {
	helpers.SendResponse(helpers.Success, "protected endpoint", http.StatusOK, w)
}
func InitRoutes(r *mux.Router) {
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		t := test{
			Name: "salik",
		}
		helpers.SendResponse(helpers.Success, t, 200, w)
	})
	uc := controller.UserController{}
	r.HandleFunc("/signup", uc.Signup).Methods("POST")
	r.HandleFunc("/login", uc.Login).Methods("POST")
	r.Handle("/protected", middleware.IsJWTAuthorized(testProtected)).Methods("GET")
	//Protect all endpoints using middleware.IsJWTAuthorized
	//Prefix actual endpoints with /api/v1
}