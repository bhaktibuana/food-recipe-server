# Food Recipe Server

## Description

Food Recipe Server is a server side of Food Recipe Final Project from Dibimbing course in the form of back-end API Server. This project uses [ExpressJs](https://www.npmjs.com/package/express) framework and MySQL as the database. This project can be accessed online at [http://foodrecipe-server.herokuapp.com](http://foodrecipe-server.herokuapp.com) or you can follow this documentation to use locally on your computer.

## What's in this app?

- REST API
- MySQL Database
- JSON Web Token
- Authentication and Authorization
- Data Secrure
- Data Validation

# Database Configuration

There are two ways how to setup the database configuration. You can choose one of the methods below:

#### 1st method

- The first of all that you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Import **./db/foodrecipe.sql** file into your MySQL database. It will automatically create new schema named "yourgaminggear" with its tables and datas.
- Open **./config/dbConnection.js** and you will see the followng code:

```javascript
const mysql = require("mysql");

const db = mysql.createPool({
  host: "YOUR_MYSQL_HOST", // "localhost" by default
  user: "YOUR_MYSQL_USER", // "root" by default
  password: "YOUR_MYSQL_PASSWORD",
  database: "foodrecipe",
});

module.exports = db;
```

- Change the value of **host**, **user** and **password** to your MySQL configuration. If you use another port for your MySQL you can add new **port** property on it.

#### 2nd method

- The first of all that you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Open **./config/dbConnection.js** and you will see the code like 1st method above.
- Change the value of **host**, **user** and **password** to your MySQL configuration. If you use another port for your MySQL you can add new **port** property on it.
- In the root project directory open your terminal and run `npm run migrate`. It will create the tables that needed.
- After create the tables you can insert data into it by running `npm run seeder`.

# Environment Variables

- At the root project directory create new `.env` file.
- Add variable named `JWT_SECRET_KEY`.
- Insert value of the `JWT_SECRET_KEY` variable with value whatever you want. E.g: `JWT_SECRET_KEY=mySecretKey`.

# Run The App

- In the root directory you can run `npm start` on your terminal.
- The server uses port: `3001` and it will be running on [http://localhost:3001](http://localhost:3001).

# API Usage

The use of the API in this project is divided into few groups. The way to access the API is as follows:

### Recipe

<details>
<summary><b>Get all recipes</b></summary>

<p>

`GET` `/recipe`

_Parameters:_ query

- `offset` integer \*requried
- `limit` integer \*required

_Response:_ JSON

- `status: 200` get recipes success

```json
{
  "count": "integer",
  "next": "string || null",
  "previous": "string || null",
  "results": [
    {
      "id": "integer",
      "category": "string",
      "name": "string",
      "cooking_time": "integer",
      "calories": "integer",
      "rating": "float",
      "image_url": "string"
    }
  ]
}
```

- `status: 404` recipe not found

```json
{
  "message": "Recipe not found."
}
```

</p>
</details>

<details>
<summary><b>Get recipes by category</b></summary>

<p>

`GET` `/recipe/{category}`

_Parameters:_ path, query

- `category` string \*required (path)
- `offset` integer \*requried (query)
- `limit` integer \*required (query)

_Response:_ JSON

- `status: 200` get recipes success

```json
{
  "count": "integer",
  "next": "string || null",
  "previous": "string || null",
  "results": [
    {
      "id": "integer",
      "category": "string",
      "name": "string",
      "cooking_time": "integer",
      "calories": "integer",
      "rating": "float",
      "image_url": "string"
    }
  ]
}
```

- `status: 404` recipe not found

```json
{
  "message": "Recipe not found."
}
```

</p>
</details>

<details>
<summary><b>Get recipe by id</b></summary>

<p>

`GET` `/recipe/{id}`

_Parameters:_ path

- `id` integer \*required

_Response:_ JSON

- `status: 200` get recipe success

```json
{
  "id": "integer",
  "username": "string",
  "category": "string",
  "name": "string",
  "description": "string",
  "cooking_time": "integer",
  "calories": "integer",
  "rating": "float",
  "image_url": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "ingredients": [
    {
      "recipe_id": "integer",
      "name": "integer"
    }
  ],
  "steps": [
    {
      "recipe_id": "integer",
      "order_number": "integer",
      "description": "string"
    }
  ]
}
```

- `status: 404` recipe not found

```json
{
  "message": "Recipe not found."
}
```

</p>
</details>

<details>
<summary><b>Create recipe</b></summary>

<p>

`POST` `/recipe`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ body

- `category` string \*required
- `name` string, max:50 \*required
- `description` string \*required
- `cooking_time` integer \*required
- `calories` integer \*required
- `image_url` string \*required
- `ingredients` JSON \*required

```json
[
  {
    "name": "string"
  }
]
```

- `steps` JSON \*required

```json
[
  {
    "order_number": "integer",
    "description": "string"
  }
]
```

_Response:_ JSON

- `status: 200` create recupe success

```json
{
  "message": "Recipe created."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

### Auth

<details>
<summary><b>Login</b></summary>

<p>

`POST` `/login`

_Parameters:_ body

- `email` string, valid email format \*required
- `password` string, min:8 \*required

_Response:_ JSON

- `status: 200` login success

```json
{
  "message": "Login success.",
  "access_token": "token"
}
```

- `status: 403` wrong auth

```json
{
  "message": "Email or password is incorrect."
}
```

- `status: 403` account has been deleted

```json
{
  "message": "Your account has been deleted."
}
```

- `status: 400` validation error

```json
{
  "message": ["error message"]
}
```

</p>
</details>

<details>
<summary><b>Register</b></summary>

<p>

`POST` `/register`

_Parameters:_ body

- `email` string, valid email format \*required
- `password` string, min:8 \*required
- `password_confirmation` string, min:8, match (ref: password) \*required

_Response:_ JSON

- `status: 200` register success

```json
{
  "message": "Registration success."
}
```

- `status: 400` validation error

```json
{
  "message": ["error message"]
}
```

</p>
</details>

### Rating

<details>
<summary><b>Get rating by recipe id</b></summary>

<p>

`GET` `/rating/recipe/{recipe_id}`

_Parameters:_ path

- `recipe_id` integer \*required

_Response:_ JSON

- `status: 200` get rating success

```json
{
  "total_vote": "integer",
  "rating": "float"
}
```

</p>
</details>

<details>
<summary><b>Get rating by user id</b></summary>

<p>

`GET` `/rating/user/{recipe_id}`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ path

- `recipe_id` integer \*required (path)

_Response:_ JSON

- `status: 200` get rating success

```json
{
  "rating": "integer"
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

<details>
<summary><b>Create and update rating</b></summary>

<p>

`POST` `/rating/{recipe_id}`

_Authorization:_ Bearer Token

- `token` access token \*required

_Parameters:_ path, body

- `recipe_id` integer \*required (path)
- `rating` integer, range(1 - 5) \*required (body)

_Response:_ JSON

- `status: 200` create rating success

```json
{
  "message": "Rating created successfully"
}
```

- `status: 200` update rating success

```json
{
  "message": "Rating updated successfully"
}
```

- `status: 400` invalid rating range

```json
{
  "message": "Rating must be between 1 and 5"
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized."
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format."
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired."
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token."
}
```

</p>
</details>

To see the response you can do API testing using an application like [Postman](https://www.postman.com/).

I hope you guys like this project and ENJOY!!! :grin:
