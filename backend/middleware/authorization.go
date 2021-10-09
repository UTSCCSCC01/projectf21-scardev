package middleware

import (
	"errors"
	"net/http"
	"openrun/helpers"
	"os"

	"github.com/golang-jwt/jwt"
)

var secretKey = []byte(os.Getenv("SECRET_KEY"))

func getTokenString(r *http.Request) (string, bool) {
	ts, in := r.Header["Authorization"]

	if !in {
		return "", false
	}

	return ts[0], true
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

func getClaimsMapFromToken(tokenString string) (jwt.MapClaims, bool) {
	token, hasErr := getTokenFromString(tokenString)

	if hasErr {
		return nil, false
	}

	m, validClaims := token.Claims.(jwt.MapClaims)
	validToken := token.Valid

	if !validClaims || !validToken {
		return nil, false
	}

	return m, true
}

func getEmailFromToken(r *http.Request) (string, bool) {
	val, ok := getTokenString(r)

	if !ok {
		return "", false
	}

	m, ok := getClaimsMapFromToken(val)

	if !ok {
		return "", false
	}

	return m["sub"].(string), true
}

func IsJWTAuthorized(handler func(http.ResponseWriter, *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		email, ok := getEmailFromToken(r)

		if !ok {
			helpers.SendResponse(helpers.Error, "unauthorized access", http.StatusUnauthorized, w)
			return
		}
		r.Header.Set("OpenRun-Email", email)
		handler(w, r)
	})
}
