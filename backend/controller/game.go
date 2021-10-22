package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"openrun/db"
	"openrun/helpers"
	"openrun/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type GameController struct {
}

/** HELPER FUNCTIONS **/

/** Creates new game from request that matches game schema **/
func initGame(r *http.Request) (*models.Game, error) {
	game := &models.Game{}
	err := json.NewDecoder(r.Body).Decode(game)

	if err != nil {
		return nil, err
	}

	game.ID = primitive.NewObjectID()

	return game, nil
}

/** Retrieve user by email from mongodb **/
func getUserByEmail(email *string) (*models.User, error) {
	dbInstance, err := db.GetDatabase()
	user := &models.User{}

	if err != nil {
		return nil, err
	}
	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return nil, err
	}

	filter := bson.D{{Key: "email", Value: email}}
	err = collection.FindOne(context.TODO(), filter).Decode(user)

	return user, err
}

/** PUBLIC ROUTE HANDLERS **/

/** Route to create a new game in mongodb **/
func (g *GameController) CreateGame(w http.ResponseWriter, r *http.Request) {
	game, err := initGame(r)

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	id, err := game.Insert()

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusInternalServerError, w)
		return
	}

	user, err := getUserByEmail(game.CreatedBy)

	if err != nil {
		fmt.Printf("No user found")
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusInternalServerError, w)
		return
	}

	err = user.InsertGame(id)

	if err != nil {
		fmt.Printf("Unable to add game to user")
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusInternalServerError, w)
		return
	}

	for i := 0; i < len(game.Players); i++ {
		user, err := getUserByEmail(&game.Players[i])

		if err != nil {
			fmt.Printf("Unable to add game to user within team")
			helpers.SendResponse(helpers.Error, err.Error(), http.StatusInternalServerError, w)
			return
		}

		user.InsertGame(id)
	}

	for i := 0; i < len(game.OppPlayers); i++ {
		user, err := getUserByEmail(&game.OppPlayers[i])

		if err != nil {
			fmt.Printf("Unable to add game to user within team")
			helpers.SendResponse(helpers.Error, err.Error(), http.StatusInternalServerError, w)
			return
		}

		user.InsertGame(id)
	}

	helpers.SendResponse(helpers.Success, id, http.StatusOK, w)
}

/** Route to retrieve game from mongodb **/
func (g *GameController) GetGames(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	userEmail := query.Get("email")

	user, err := getUserByEmail(&userEmail)

	if err != nil {
		fmt.Printf("No user found")
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusInternalServerError, w)
		return
	}

	games, err := user.GetGamesList()

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusInternalServerError, w)
		return
	}

	helpers.SendResponse(helpers.Success, games, http.StatusOK, w)
}
