package middleware

import (
	"errors"
	"net/http"
	"openrun/helpers"
	"os"

	"github.com/golang-jwt/jwt"
)

var secretKey = []byte(os.Getenv("SECRET_KEY"))
func hasAuthHeader(r *http.Request) (string, bool) {
	ts, in := r.Header["Authorization"] 
	return ts[0], in
}

func getTokenFromString(tokenString string) (*jwt.Token, bool) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, errors.New("unable to parse jwt token")
		}
		return secretKey, nil
	})

	if err != nil {
		return nil, true
	}

	return token, false
}

func isValidToken(tokenString string) bool {
	token, hasErr := getTokenFromString(tokenString)

	if hasErr {
		return false
	}

	_, validClaims := token.Claims.(jwt.MapClaims)
	validToken := token.Valid
	
	return validClaims && validToken
}

func isAuthorizedRequest(r *http.Request) bool {
	val, hasToken := hasAuthHeader(r)

	return hasToken && isValidToken(val)
}

func IsJWTAuthorized(handler func(http.ResponseWriter, *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		 
		if isAuthorizedRequest(r) {
			helpers.SendResponse(helpers.Error, "unauthorized access", http.StatusUnauthorized, w)
			return
		}
		handler(w, r)
	})
}