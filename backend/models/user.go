package models

import (
	"context"
	"openrun/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID   `bson:"_id"`
	FirstName   *string              `json:"first_name" validate:"max=100"`
	LastName    *string              `json:"last_name" validate:"max=100"`
	Password    *string              `json:"password" validate:"required"`
	Email       *string              `json:"email" validate:"required"`
	Phone       *string              `json:"phone"`
	IsFreeAgent bool                 `json:"is_free_agent"`
	Games       []primitive.ObjectID `json:"games"`
	Followers []string `json:"followers"`
	Following []string `json:"following"`
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

/** Add game to game list within User object **/
func (u *User) InsertGame(gameId *string) error {
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return err
	}
	collection, err := dbInstance.OpenCollection("Users")

	if err != nil {
		return err
	}

	objID, err := primitive.ObjectIDFromHex(*gameId)

	if err != nil {
		return err
	}

	filter := bson.D{{Key: "email", Value: u.Email}}
	update := bson.D{{Key: "$push", Value: bson.D{{Key: "games", Value: objID}}}}
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

func (u *User) GetGamesList() ([]*Game, error) {
	dbInstance, err := db.GetDatabase()

	if err != nil {
		return nil, err
	}
	collection, err := dbInstance.OpenCollection("Games")

	if err != nil {
		return nil, err
	}

	gamesID := u.Games
	games := []*Game{}

	for i := 0; i < len(gamesID); i++ {
		game := &Game{}
		filter := bson.D{{Key: "_id", Value: gamesID[i]}}
		err = collection.FindOne(context.TODO(), filter).Decode(game)

		if err != nil {
			return nil, err
		}

		games = append(games, game)
	}

	return games, err
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
