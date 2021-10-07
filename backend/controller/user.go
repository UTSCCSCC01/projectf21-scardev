package controller

import (
	"encoding/json"
	"net/http"
	"openrun/helpers"
	"openrun/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {

}

func getHashedPassword(pwd string) (string, error) {
	a := []byte(pwd)

	hash, err := bcrypt.GenerateFromPassword(a, bcrypt.MinCost)

	if err != nil {
		return "", err
	}

	return string(hash), nil
}

func initUser(r *http.Request) (*models.User, error){
	user := &models.User{}
	err := json.NewDecoder(r.Body).Decode(user)

	if err != nil {
		return nil, err
	}

	hp, err := getHashedPassword(*user.Password)

	if err != nil {
		return nil, err
	}

	user.Password = &hp
	user.ID = primitive.NewObjectID()

	return user, nil
}

func (u *UserController) Signup(w http.ResponseWriter, r *http.Request) {
	user, err := initUser(r)

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	if user.IsExisting() {
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