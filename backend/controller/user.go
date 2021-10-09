package controller

import (
	"encoding/json"
	"net/http"
	"openrun/helpers"
	"openrun/models"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
}

var secretKey = []byte(os.Getenv("SECRET_KEY"))

func makeJWT(email string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["sub"] = email
	claims["exp"] = time.Now().Add(time.Hour * 1).Unix()

	tknString, err := token.SignedString(secretKey)

	if err != nil {
		return "", err
	}
	return tknString, nil
}

func getHashedPassword(pwd string) (string, error) {
	a := []byte(pwd)

	hash, err := bcrypt.GenerateFromPassword(a, bcrypt.MinCost)

	if err != nil {
		return "", err
	}

	return string(hash), nil
}

func initUser(r *http.Request) (*models.User, error) {
	user := &models.User{}
	err := json.NewDecoder(r.Body).Decode(user)

	if err != nil {
		return nil, err
	}

	// hp, err := getHashedPassword(*user.Password)

	// if err != nil {
	// 	return nil, err
	// }

	// user.Password = &hp
	user.ID = primitive.NewObjectID()

	return user, nil
}

func authenticatePassword(password, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))

	return err == nil
}

func (u *UserController) Signup(w http.ResponseWriter, r *http.Request) {
	user, err := initUser(r)

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	hp, err := getHashedPassword(*user.Password)

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	user.Password = &hp
	user.IsFreeAgent = false

	_, exists := user.IsExisting()
	if exists {
		helpers.SendResponse(helpers.Error, "user with given email already exists, please try again", http.StatusBadRequest, w)
		return
	}

	id, err := user.Insert()

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusInternalServerError, w)
		return
	}

	helpers.SendResponse(helpers.Success, id, http.StatusOK, w)
}

func (u *UserController) Login(w http.ResponseWriter, r *http.Request) {
	user, err := initUser(r)

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	existingUser, exists := user.IsExisting()

	if !exists {
		helpers.SendResponse(helpers.Error, "user does not exist with given email", http.StatusNotFound, w)
		return
	}

	isValidLogin := authenticatePassword(*user.Password, *existingUser.Password)

	if !isValidLogin {
		helpers.SendResponse(helpers.Error, "wrong password, please try again!", http.StatusUnauthorized, w)
		return
	}

	s, err := makeJWT(*user.Email)

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusInternalServerError, w)
		return
	}

	helpers.SendResponse(helpers.Success, s, http.StatusOK, w)
}

func (u *UserController) UpdateFreeAgentStatus(w http.ResponseWriter, r *http.Request) {
	user, err := initUser(r)

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	_, exists := user.IsExisting()

	if !exists {
		helpers.SendResponse(helpers.Error, "user does not exist with given email", http.StatusNotFound, w)
		return
	}

	err = user.SetFreeAgent()

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusNotFound, w)
		return
	}

	helpers.SendResponse(helpers.Success, "", http.StatusNoContent, w)
}
