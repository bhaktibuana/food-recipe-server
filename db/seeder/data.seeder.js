const db = require("../../config/dbConnection");
const fs = require("fs");
const crypto = require("crypto");

let queryCount = 0;
const totalQuery = 6;

const insertUsers = () => {
  const dataUsers = JSON.parse(fs.readFileSync("./db/seeder/dataUsers.json"));

  dataUsers.forEach((value, index) => {
    const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?);`;
    db.query(
      insertQuery,
      [
        value.name,
        value.email,
        crypto.createHash("sha256").update(value.password).digest("hex"),
      ],
      (error, results) => {
        if (error) throw new Error(error);

        console.log(`Data user: "${value.name}" inserted!`);

        if (index === dataUsers.length - 1) {
          queryCount += 1;
          insertCategories();
          if (queryCount === totalQuery) process.exit(0);
        }
      }
    );
  });
};

const insertCategories = () => {
  const dataCategories = JSON.parse(
    fs.readFileSync("./db/seeder/dataCategories.json")
  );

  dataCategories.forEach((value, index) => {
    const insertQuery = `INSERT INTO categories (name) VALUES (?);`;
    db.query(insertQuery, [value.name], (error, results) => {
      if (error) throw new Error(error);

      console.log(`Data category: "${value.name}" inserted!`);

      if (index === dataCategories.length - 1) {
        queryCount += 1;
        insertRecipes();
        if (queryCount === totalQuery) process.exit(0);
      }
    });
  });
};

const insertRecipes = () => {
  const dataRecipes = JSON.parse(
    fs.readFileSync("./db/seeder/dataRecipes.json")
  );

  dataRecipes.forEach((value, index) => {
    const getUserQuery = `SELECT id FROM users WHERE name = ?;`;
    db.query(getUserQuery, [value.user], (error, results) => {
      if (error) throw new Error(error);

      const userId = results[0].id;

      const getCategoryQuery = `SELECT id FROM categories WHERE name = ?;`;
      db.query(getCategoryQuery, [value.category], (error, results) => {
        if (error) throw new Error(error);

        const categoryId = results[0].id;

        const insertQuery = `INSERT INTO recipes (user_id, category_id, name, description, cooking_time, calories, image_url) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        db.query(
          insertQuery,
          [
            userId,
            categoryId,
            value.name,
            value.description,
            value.cooking_time,
            value.calories,
            value.image_url,
          ],
          (error, results) => {
            if (error) throw new Error(error);

            console.log(`Data recipe: "${value.name}" inserted!`);

            if (index === dataRecipes.length - 1) {
              queryCount += 1;
              insertIngredients();
              if (queryCount === totalQuery) process.exit(0);
            }
          }
        );
      });
    });
  });
};

const insertIngredients = () => {
  const dataIngredients = JSON.parse(
    fs.readFileSync("./db/seeder/dataIngredients.json")
  );

  dataIngredients.forEach((value, index) => {
    const getRecipeQuery = `SELECT id FROM recipes WHERE name = ?;`;
    db.query(getRecipeQuery, [value.recipe], (error, results) => {
      if (error) throw new Error(error);

      const recipeId = results[0].id;

      const insertQuery = `INSERT INTO ingredients (recipe_id, name) VALUES (?, ?);`;
      db.query(insertQuery, [recipeId, value.name], (error, results) => {
        if (error) throw new Error(error);

        console.log(`Data ingredient: "${value.name}" inserted!`);

        if (index === dataIngredients.length - 1) {
          queryCount += 1;
          insertSteps();
          if (queryCount === totalQuery) process.exit(0);
        }
      });
    });
  });
};

const insertSteps = () => {
  const dataSteps = JSON.parse(fs.readFileSync("./db/seeder/dataSteps.json"));

  dataSteps.forEach((value, index) => {
    const getRecipeQuery = `SELECT id FROM recipes WHERE name = ?;`;
    db.query(getRecipeQuery, [value.recipe], (error, results) => {
      if (error) throw new Error(error);

      const recipeId = results[0].id;

      const insertQuery = `INSERT INTO steps (recipe_id, order_number, description) VALUES (?, ?, ?);`;
      db.query(
        insertQuery,
        [recipeId, value.order_number, value.description],
        (error, results) => {
          if (error) throw new Error(error);

          console.log(`Data step: "${value.description}" inserted!`);

          if (index === dataSteps.length - 1) {
            queryCount += 1;
            insertRating();
            if (queryCount === totalQuery) process.exit(0);
          }
        }
      );
    });
  });
};

const insertRating = () => {
  const dataRating = JSON.parse(fs.readFileSync("./db/seeder/dataRating.json"));

  dataRating.forEach((value, index) => {
    const getRecipeQuery = `SELECT id FROM recipes WHERE name = ?;`;
    db.query(getRecipeQuery, [value.recipe], (error, results) => {
      if (error) throw new Error(error);

      const recipeId = results[0].id;

      const getUserQuery = `SELECT id FROM users WHERE name = ?;`;
      db.query(getUserQuery, [value.user], (error, results) => {
        if (error) throw new Error(error);

        const userId = results[0].id;

        const insertQuery = `INSERT INTO rating (recipe_id, user_id, rating) VALUES (?, ?, ?);`;
        db.query(
          insertQuery,
          [recipeId, userId, value.rating],
          (error, results) => {
            if (error) throw new Error(error);

            console.log(`Data rating: "${value.rating}" inserted!`);

            if (index === dataRating.length - 1) {
              queryCount += 1;
              if (queryCount === totalQuery) process.exit(0);
            }
          }
        );
      });
    });
  });
};

insertUsers();
