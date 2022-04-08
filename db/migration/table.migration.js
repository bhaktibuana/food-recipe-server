const db = require("../../config/dbConnection");

let queryCount = 0;
const totalQuery = 7;

const createUsersQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (50) NOT NULL,
    email VARCHAR (50) NOT NULL,
    password VARCHAR (255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
  );
`;

db.query(createUsersQuery, (error, results) => {
  if (error) throw new Error(error);

  console.log("Table users created!");
  queryCount += 1;
  if (queryCount === totalQuery) process.exit(0);
});

const createCategoryQuery = `
  CREATE TABLE IF NOT EXISTS categories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id)
  );
`;

db.query(createCategoryQuery, (error, results) => {
  if (error) throw new Error(error);

  console.log("Table categories created!");
  queryCount += 1;
  if (queryCount === totalQuery) process.exit(0);
});

const createRecipesQuery = `
  CREATE TABLE IF NOT EXISTS recipes (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    name VARCHAR (50) NOT NULL,
    description TEXT NOT NULL,
    cooking_time INT NOT NULL,
    calories INT NOT NULL,
    image_url VARCHAR (255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (category_id) REFERENCES categories (id)
  );
`;

db.query(createRecipesQuery, (error, results) => {
  if (error) throw new Error(error);

  console.log("Table recipes created!");
  queryCount += 1;
  if (queryCount === totalQuery) process.exit(0);
});

const createIngredientsQuery = `
  CREATE TABLE IF NOT EXISTS ingredients (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    name VARCHAR (255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (recipe_id) REFERENCES recipes (id)
  );
`;

db.query(createIngredientsQuery, (error, results) => {
  if (error) throw new Error(error);

  console.log("Table ingredients created!");
  queryCount += 1;
  if (queryCount === totalQuery) process.exit(0);
});

const createStepsQuery = `
  CREATE TABLE IF NOT EXISTS steps (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    order_number INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (recipe_id) REFERENCES recipes (id)
  );
`;

db.query(createStepsQuery, (error, results) => {
  if (error) throw new Error(error);

  console.log("Table steps created!");
  queryCount += 1;
  if (queryCount === totalQuery) process.exit(0);
});

const createRatingQuery = `
  CREATE TABLE IF NOT EXISTS rating (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    rating FLOAT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (recipe_id) REFERENCES recipes (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`;

db.query(createRatingQuery, (error, results) => {
  if (error) throw new Error(error);

  console.log("Table rating created!");
  queryCount += 1;
  if (queryCount === totalQuery) process.exit(0);
});

const createCommentsQuery = `
  CREATE TABLE IF NOT EXISTS comments (
    id INT NOT NULL AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (recipe_id) REFERENCES recipes (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`;

db.query(createCommentsQuery, (error, results) => {
  if (error) throw new Error(error);

  console.log("Table comments created!");
  queryCount += 1;
  if (queryCount === totalQuery) process.exit(0);
});
