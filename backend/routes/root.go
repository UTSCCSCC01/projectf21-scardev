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
	gc := controller.GameController{}

	/*
			Expects - {
				first_name: "name"
				last_name: "last"
				"password": "password",
		    "email": "email@gmail.com",
		    "phone": "4166666666"
			}

			Returns on success - {
				success: true
				data: <userId>
			}

			On error - {
				success: false
				error: <some_error_desc>
			}
	*/
	r.HandleFunc("/signup", uc.Signup).Methods("POST")
	/*
			Expects - {
				"password": "password",
		    "email": "email@gmail.com"
			}

			Returns on success - {
				success: true
				data: <token>
			}

			set Authorization header to token in subsequent requests

			On error - {
				success: false
				error: <some_error_desc>
			}
	*/
	r.HandleFunc("/login", uc.Login).Methods("POST")
	// r.Handle("/protected", middleware.IsJWTAuthorized(testProtected)).Methods("GET")
	/*
					Expects - {
		    		"email": "salikchou4@gmail.com",
		    		"is_free_agent": true
		 			}

					Returns - Nothing, 204 No content

					On error - relevent error
	*/
	r.Handle("/api/v1/user/freeagentstatus", middleware.IsJWTAuthorized(uc.UpdateFreeAgentStatus)).Methods("PUT")
	//Protect all endpoints using middleware.IsJWTAuthorized
	//Prefix actual endpoints with /api/v1

	/** Damian's routes - check for bs pls **/
	r.HandleFunc("/api/v1/games/create", gc.CreateGame).Methods("POST")
}
