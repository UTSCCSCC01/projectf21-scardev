package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	mongo *mongo.Database
}

var db *Database

/*
	Connects to mongoDB database.
	params:
		- mongoUri {string} the uri of the mongo instance
		- dbName {string} the name of the database to retrieve
	returns:
		- error {error} if something goes wrong return error else return nil
*/
func Init(mongoUri string, dbName string) error {
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoUri))

	if err != nil {
		return fmt.Errorf("unable to init mongo client: %w\n", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()
	err = client.Connect(ctx)

	if err != nil {
		return fmt.Errorf("unable to init mongo client: %w\n", err)
	}

	log.Println("connected to mongodb")

	db = &Database{
		mongo: client.Database(dbName),
	}

	return nil
}

/*
	Gets singleton instance of database.
	params:
		None
	returns:
		- {*Database} reference to database struct
		- {error} an error if something fails else returns nil
*/
func GetDatabase() (*Database, error) {
	if db == nil {
		return nil, fmt.Errorf("must init database first")
	}
	return db, nil
}

/*
	Gets connection to specified collection within database.
	params:
		- database {*Database} a reference to mongo database instance
		- collection {string} name of the collection to retrieve
	returns:
		- {*mongo.Collection} reference to the requested collection
		- {error} an error if something fails else returns nil
*/
func (database *Database) OpenCollection(collection string) (*mongo.Collection, error) {
	if db == nil {
		return nil, fmt.Errorf("nil db, must not be nil")
	}

	return database.mongo.Collection(collection), nil
}
