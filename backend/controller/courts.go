package controller

import (
	"encoding/json"
	"net/http"
	"openrun/helpers"
	"openrun/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type CourtsController struct {
}

func initCourt(r *http.Request) (*models.Court, error) {
	court := &models.Court{}
	err := json.NewDecoder(r.Body).Decode(court)

	if err != nil {
		return nil, err
	}

	court.ID = primitive.NewObjectID()

	return court, nil
}

func (cc *CourtsController) AddNewCourt(w http.ResponseWriter, r *http.Request) {
	c, err := initCourt(r)

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	err = c.Insert()

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	helpers.SendResponse(helpers.Success, "successfully added new court", http.StatusOK, w)
}

func (cc *CourtsController) GetAllCourts(w http.ResponseWriter, r *http.Request) {
	c := &models.Court{}

	res, err := c.GetAll()

	if err != nil {
		helpers.SendResponse(helpers.Error, err.Error(), http.StatusBadRequest, w)
		return
	}

	helpers.SendResponse(helpers.Success, res, http.StatusOK, w)

}
