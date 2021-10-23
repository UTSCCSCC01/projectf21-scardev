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
	r.Methods("OPTIONS").HandlerFunc(
		func(w http.ResponseWriter, r *http.Request){
			headers := w.Header()
			headers.Add("Access-Control-Allow-Origin", "*")
			headers.Add("Vary", "Origin")
			headers.Add("Vary", "Access-Control-Request-Method")
			headers.Add("Vary", "Access-Control-Request-Headers")
			headers.Add("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization, X-CSRF-Token")
			headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
			w.WriteHeader(http.StatusOK)
			return
		},
	)
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
	r.Handle("/api/v1/user/following", middleware.IsJWTAuthorized(uc.Follow)).Methods("POST") //handlefunc or handle
	//Protect all endpoints using middleware.IsJWTAuthorized
	//Prefix actual endpoints with /api/v1

	/** Damian's routes - check for bs pls **/
	r.HandleFunc("/api/v1/games/create", gc.CreateGame).Methods("POST")
	r.HandleFunc("/api/v1/games/get", gc.GetGames).Methods("GET")
	r.HandleFunc("/api/v1/games/approve", gc.Approve).Methods("POST")

	r.Handle("/api/v1/user/getname", middleware.IsJWTAuthorized(uc.GetUserName)).Methods("PUT")
}
