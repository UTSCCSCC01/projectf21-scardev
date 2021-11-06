package models

import (
	"context"
	"openrun/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID          primitive.ObjectID `bson:"_id"`
	FirstName   *string            `json:"first_name" validate:"max=100"`
	LastName    *string            `json:"last_name" validate:"max=100"`
	Password    *string            `json:"password" validate:"required"`
	Email       *string            `json:"email" validate:"required"`
	Phone       *string            `json:"phone"`
	IsFreeAgent bool               `json:"is_free_agent"`
	Followers   []string           `json:"followers"`
	Following   []string           `json:"following"`
	Level       *string            `json: "level"`
	// UserId string `json:"user_id"`
}

func (u *User) IsExisting() (*User, bool) {
	filter := bson.D{{Key: "email", Value: u.Email}}
	res := &User{}
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return nil, false
	}

	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return nil, false

	}
	err = collection.FindOne(context.TODO(), filter).Decode(res)

	return res, err == nil
}

func (u *User) Insert() ([]byte, error) {

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

func (u *User) SetFreeAgent() error {
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return err
	}
	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return err
	}

	filter := bson.D{{Key: "email", Value: u.Email}}
	update := bson.D{{Key: "$set", Value: bson.D{{Key: "isfreeagent", Value: u.IsFreeAgent}}}}
	_, err = collection.UpdateOne(context.TODO(), filter, update)

	return err
}

func (u *User) AddToMyFollowing(email string) error {
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return err
	}
	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return err
	}

	//append to my following
	filter := bson.D{{Key: "email", Value: u.Email}}
	update := bson.D{{Key: "$addToSet", Value: bson.D{{Key: "following", Value: email}}}}
	_, err = collection.UpdateOne(context.TODO(), filter, update)

	return err
}

func (u *User) AddToOtherPersonsFollowers(email string) error {
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return err
	}
	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return err
	}

	//append to my following
	filter := bson.D{{Key: "email", Value: email}}
	update := bson.D{{Key: "$addToSet", Value: bson.D{{Key: "followers", Value: u.Email}}}}
	_, err = collection.UpdateOne(context.TODO(), filter, update)

	return err
}

func (u *User) CountFollowers() int {
	return len(u.Followers)
}

func (u *User) CountFollowing() int {
	return len(u.Following)
}

func (u *User) GetLevel() string {
	filter := bson.D{{Key: "email", Value: u.Email}}
	res := &User{}
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return ""
	}

	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return ""

	}
	err = collection.FindOne(context.TODO(), filter).Decode(res)

	return *res.Level
	// return *u.Level
}

func (u *User) ChangeLevel(level string) (*mongo.UpdateResult, error) {
	dbInstance, err := db.GetDatabase()
	if err != nil {
		return nil, err
	}
	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return nil, err
	}

	//append to my following
	filter := bson.D{{Key: "email", Value: u.Email}}
	update := bson.D{{Key: "$set", Value: bson.D{{Key: "level", Value: level}}}}
	res, err := collection.UpdateOne(context.TODO(), filter, update)

	return res, err
}
