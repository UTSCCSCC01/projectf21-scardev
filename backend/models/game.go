package models

import (
	"context"
	"openrun/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Game struct {
	ID         primitive.ObjectID `bson:"_id"`
	CreatedBy  *string            `json:"created_by"`
	Location   *string            `json:"location"`
	Date       *string            `json:"date"`
	Score      int                `json:"score"`
	OppScore   int                `json:"opp_score"`
	Players    []string           `json:"players"`
	OppPlayers []string           `json:"opp_players"`
	Approved   bool               `json:"approved"`
}

func (g *Game) Insert() (*string, error) {
	//edit
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return nil, err
	}

	collection, err := dbInstance.OpenCollection("Games")

	if err != nil {
		return nil, err
	}

	res, err := collection.InsertOne(context.TODO(), g)

	if err != nil {
		return nil, err
	}

	oid := res.InsertedID.(primitive.ObjectID).Hex()
	//idAsBytes := oid[:]

	return &oid, nil
}

func (g *Game) Approve() error {
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return err
	}
	collection, err := dbInstance.OpenCollection("Games")

	if err != nil {
		return err
	}

	filter := bson.D{{Key: "_id", Value: g.ID}}
	update := bson.D{{Key: "$set", Value: bson.D{{Key: "approved", Value: true}}}}
	_, err = collection.UpdateOne(context.TODO(), filter, update)

	return err
}
