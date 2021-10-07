package db

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Database struct {
	mongo *mongo.Database
}
var db *Database
func Init(mongoUri string, dbName string) (error) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://admin:admin@cluster0.l0byk.mongodb.net/OpenRun?retryWrites=true&w=majority"))
	

	if err != nil {
		return fmt.Errorf("unable to init mongo client: %w\n", err)
	}

	
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()
	err = client.Connect(ctx)

	if err != nil {
		return fmt.Errorf("unable to init mongo client: %w\n", err)
	}

	fmt.Println("Connected to MongoDB!")

	db = &Database{
		mongo: client.Database("OpenRun"),
	}

	return nil
}

func GetDatabase() (*Database,error) {
	if db == nil {
		return nil, fmt.Errorf("must init database first")
	}
	return db, nil
}


func (database *Database)OpenCollection(collection string) (*mongo.Collection, error) {
	if db == nil {
		return nil, fmt.Errorf("nil db, must not be nil")
	}

	return database.mongo.Collection(collection), nil
}