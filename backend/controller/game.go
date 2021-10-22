package controller

import (
	"encoding/json"
	"net/http"
	"openrun/helpers"
	"openrun/models"

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

/** PUBLIC ROUTE HANDLERS **/
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

	helpers.SendResponse(helpers.Success, id, http.StatusOK, w)
}
