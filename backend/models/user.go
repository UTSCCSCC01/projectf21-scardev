package models

import (
	"context"
	"openrun/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID primitive.ObjectID `bson:"_id"`
	FirstName *string `json:"first_name" validate:"required,max=100"`
	LastName *string `json:"last_name" validate:"required,max=100"`
	Password *string `validate:"required"`
	Email *string `validate:"required"`
	Phone *string `validate:"required"`
	// UserId string `json:"user_id"`
}

func (u *User) IsExisting() (bool) {
	filter := bson.D{{"email", u.Email}}
	var res User
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return false
	}

	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return false
	}
	err = collection.FindOne(context.TODO(), filter).Decode(&res)

	return err == nil
}

func (u *User)Insert() ([]byte, error) {
	
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return nil, err
	}
	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return nil, err
	}
	res, err := collection.InsertOne(context.TODO(), u)

	if err != nil {
		return nil, err
	}

	oid := res.InsertedID.(primitive.ObjectID)
	idAsBytes := oid[:]

	return idAsBytes, nil
}
