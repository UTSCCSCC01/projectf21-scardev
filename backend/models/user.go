package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID primitive.ObjectID `bson:"_id"`
	FirstName *string `json:"first_name" validate:"required,max=100"`
	LastName *string `json:"last_name" validate:"required,max=100"`
	Password *string `validate:"required,min=8"`
	Email *string `validate:"required"`
	Phone *string `validate:"required"`
	UserId string `json:"user_id"`
}
