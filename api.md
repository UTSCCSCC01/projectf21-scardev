### `POST /signup`
   #### Body - `application/json`:
   ```
   {
				first_name: "name"
				last_name: "last"
				"password": "password",
		  "email": "email@gmail.com",
		  "phone": "4166666666"
			}
   ```
   #### Example Success Response
   ```
   {
     "success": true,
     "data": "User ID"
   }
   ```
   The given credentials will be later on used to login
   
### `POST /login`
   #### Body - `application/json`:
   ```
   {
				 "password": "password",
		   "email": "email@gmail.com"
			}
   ```
   #### Example Success Response
   ```
   {
     "success": true,
     "data": "JWT_TOKEN"
   }
   ```
   The given JWT token will be used in all further requests for authorization purposes.
   
### `PUT /api/v1/user/freeagentstatus`
   #### Body - `application/json`:
   ```
   {
    "email": "email_here",
    "is_free_agent": true/false
   }
   ```
   #### Returns 204 - No response
  
### `POST /api/v1/user/following`
   #### Body - `application/json':
   ```
   {"person_to_follow": "some@email.com"}
   ```
   #### Returns 204 No response on success

### `POST /api/v1/user/getname`
   #### Body - `application/json':
   ```
   {
      "token": "userToken"
   }
   ```
   #### Returns
   ```
   {
     "success": true,
     "data": "Full Name of user with given token"
   }
   ```
### `POST /api/v1/games/create`
   #### Body - `application/json':
   ```
   {
    "created_by": "tester@hotmail.com",
    "location": "Panam Center",
    "date": "2021-10-06",
    "score": 11,
    "opp_score": 5,
    "players": [
        "damian",
        "jameson",
        "salik"
    ],
    "opp_players": [
        "vigaash",
        "rahul"
    ],
    "approved": false
}
```
### `GET /api/v1/games/get?userId=123456`

### `PUT /api/v1/games/approve`
   #### Body - `application/json':
   ```
   {
    "_id": "617305fe6020c948b62e2f57",
    "approved": true
   }
```







    

   
