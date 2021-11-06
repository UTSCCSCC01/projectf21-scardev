package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"openrun/helpers"
	"openrun/models"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type JWTToken struct {
	Token string
}

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

func getEmailFromToken(tokenStr string) string {
	tokenParsed, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return secretKey, nil
	})

	if err != nil {
		return ""
	}
	claims, ok := tokenParsed.Claims.(jwt.MapClaims)
	if ok && tokenParsed.Valid {
		email := claims["sub"]

		return email.(string)
	}
	return ""
}

func (u *UserController) GetUserName(w http.ResponseWriter, r *http.Request) {
	var token JWTToken
	json.NewDecoder(r.Body).Decode(&token)

	email := getEmailFromToken(token.Token)
	user := &models.User{}
	user.Email = &email

	properUser, exists := user.IsExisting()
	if exists {
		name := *properUser.FirstName + " " + *properUser.LastName
		helpers.SendResponse(helpers.Success, name, http.StatusOK, w)
	}
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
	defaultLevel := "Amateur"
	user.Level = &defaultLevel

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

type FollowRequest struct {
	PersonToFollow string `json:"person_to_follow"`
}

func (u *UserController) Follow(w http.ResponseWriter, r *http.Request) {

	//CHECK IF PERSON ALREADY FOLLOWS, AND CHECK IF YOU CAN FOLLOW URSELF

	user := &models.User{}
	e := r.Header.Get("OpenRun-Email")
	user.Email = &e

	fr := &FollowRequest{}
	err := json.NewDecoder(r.Body).Decode(fr)
	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	otherUser := &models.User{}
	otherUser.Email = &fr.PersonToFollow
	_, exists := otherUser.IsExisting()
	if !exists {
		helpers.SendResponse(helpers.Error, "user who you want to follow does not exist with given email", http.StatusNotFound, w)
		return
	}

	_, exists = user.IsExisting()

	if !exists {
		helpers.SendResponse(helpers.Error, "user does not exist with given email", http.StatusNotFound, w)
		return
	}

	err = user.AddToMyFollowing(fr.PersonToFollow) //how to get the parameter which is objectid at a string of person I want to follow

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusNotFound, w)
		return
	}

	err = user.AddToOtherPersonsFollowers(fr.PersonToFollow) //how to get the parameter which is objectid at a string of person I want to follow

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusNotFound, w)
		return
	}

	helpers.SendResponse(helpers.Success, "", http.StatusNoContent, w)
}

func (u *UserController) GetNumberOfFollowers(w http.ResponseWriter, r *http.Request) {
	var token JWTToken
	json.NewDecoder(r.Body).Decode(&token)

	email := getEmailFromToken(token.Token)
	user := &models.User{}
	user.Email = &email

	properUser, exists := user.IsExisting()
	if exists {
		followersCount := properUser.CountFollowers()
		helpers.SendResponse(helpers.Success, followersCount, http.StatusOK, w)
	}
}

func (u *UserController) GetNumberOfFollowing(w http.ResponseWriter, r *http.Request) {
	var token JWTToken
	json.NewDecoder(r.Body).Decode(&token)

	email := getEmailFromToken(token.Token)
	user := &models.User{}
	user.Email = &email

	properUser, exists := user.IsExisting()
	if exists {
		followingCount := properUser.CountFollowing()
		helpers.SendResponse(helpers.Success, followingCount, http.StatusOK, w)
	}
}

func (u *UserController) GetLevel(w http.ResponseWriter, r *http.Request) {
	var token JWTToken
	json.NewDecoder(r.Body).Decode(&token)
	// fmt.Println(token)
	email := getEmailFromToken(token.Token)
	user := &models.User{}
	user.Email = &email

	properUser, exists := user.IsExisting()
	if exists {
		userLevel := properUser.GetLevel()
		helpers.SendResponse(helpers.Success, userLevel, http.StatusOK, w)
	}
}

type UserLevel struct {
	Level string
}

func (u *UserController) ChangeLevel(w http.ResponseWriter, r *http.Request) {
	var testLevel UserLevel
	err := json.NewDecoder(r.Body).Decode(&testLevel)
	fmt.Println(testLevel)
	if err != nil {
		fmt.Println("There was an error!")
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}
	email := getEmailFromToken(r.Header.Get("Authorization"))
	user := &models.User{}
	user.Email = &email
	testString := testLevel.Level
	properUser, exists := user.IsExisting()
	if exists {
		properUser.ChangeLevel(testString)
		helpers.SendResponse(helpers.Success, "", http.StatusOK, w)
	}
}
