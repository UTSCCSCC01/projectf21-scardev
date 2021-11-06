package models

import (
	"context"
	"fmt"
	"openrun/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Court struct {
	ID    primitive.ObjectID `bson:"_id"`
	Title *string            `json:"title" validate:"required"`
	Name  *string            `json:"name" validate:"required"`
	Lat   *float64           `json:"lat" validate:"required"`
	Lng   *float64           `json:"lng" validate:"required"`
	// UserId string `json:"user_id"`
}

func (c *Court) Insert() error {
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return err
	}

	collection, err := dbInstance.OpenCollection("Courts")

	if err != nil {
		return err
	}

	_, err = collection.InsertOne(context.TODO(), c)

	return err
}

func (c *Court) GetAll() ([]*Court, error) {
	dbInstance, err := db.GetDatabase()
	res := []*Court{}

	if err != nil {
		return nil, err
	}

	collection, err := dbInstance.OpenCollection("Courts")

	if err != nil {
		return nil, err
	}

	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find())

	if err != nil {
		return nil, err
	}

	for cur.Next(context.TODO()) {
		c := &Court{}
		err := cur.Decode(c)

		if err != nil {
			return nil, err
		}

		res = append(res, c)
	}

	fmt.Printf("%v\n", res)

	return res, nil
}