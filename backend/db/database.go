package db

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var db *mongo.Database
func GetInstance(mongoUri string, dbName string) (*mongo.Database, error) {
	if db != nil {
		return db, nil
	}

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoUri))
	

	if err != nil {
		return nil, fmt.Errorf("unable to init mongo client: %w\n", err)
	}

	
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()
	err = client.Connect(ctx)

	if err != nil {
		return nil, fmt.Errorf("unable to init mongo client: %w\n", err)
	}

	fmt.Println("Connected to MongoDB!")

	db := client.Database(dbName)

	return db, nil
}

func OpenCollection(db *mongo.Database, collection string) (*mongo.Collection, error) {
	if db == nil {
		return nil, fmt.Errorf("nil db, must not be nil")
	}

	return db.Collection(collection), nil
}