const recipeModel = require("../models/recipe.model");
const ingredientModel = require("../models/ingredient.model");
const stepModel = require("../models/step.model");
const categoryModel = require("../models/category.model");

const getAllRecipes = (req, res) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);

  recipeModel.countAll((error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      const count = results[0].count;

      if (parseInt(count) === 0) {
        res.status(404).json({
          message: "Recipe not found.",
        });
      } else {
        recipeModel.selectAll([offset, limit], (error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            res.status(200).json({
              count: count,
              next:
                offset + limit >= count
                  ? null
                  : `${req.protocol}://${req.get("host")}${req.originalUrl
                      .split("?")
                      .shift()}?offset=${offset + limit}&limit=${limit}`,
              previous:
                offset - limit < 0
                  ? null
                  : `${req.protocol}://${req.get("host")}${req.originalUrl
                      .split("?")
                      .shift()}?offset=${offset - limit}&limit=${limit}`,
              results: results,
            });
          }
        });
      }
    }
  });
};

const getByParams = (req, res) => {
  const endpoint = req.params.endpoint;

  if (isNaN(endpoint)) {
    getRecipesByCategory(endpoint, req, res);
  } else {
    getRecipeById(endpoint, req, res);
  }
};

const getRecipesByCategory = (category, req, res) => {
  const offset = parseInt(req.query.offset);
  const limit = parseInt(req.query.limit);

  recipeModel.countByCategory([category], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      const count = results[0].count;

      if (parseInt(count) === 0) {
        res.status(404).json({
          message: "Recipe not found.",
        });
      } else {
        recipeModel.selectByCategory(
          [category, offset, limit],
          (error, results) => {
            if (error) {
              res.status(500).json(error);
            } else {
              res.status(200).json({
                count: count,
                next:
                  offset + limit >= count
                    ? null
                    : `${req.protocol}://${req.get("host")}${req.originalUrl
                        .split("?")
                        .shift()}?offset=${offset + limit}&limit=${limit}`,
                previous:
                  offset - limit < 0
                    ? null
                    : `${req.protocol}://${req.get("host")}${req.originalUrl
                        .split("?")
                        .shift()}?offset=${offset - limit}&limit=${limit}`,
                results: results,
              });
            }
          }
        );
      }
    }
  });
};

const getRecipeById = (id, req, res) => {
  recipeModel.selectById([id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "Recipe not found.",
        });
      } else {
        const recipeData = results[0];

        ingredientModel.selectByRecipeId([id], (error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            const ingredients = results;

            stepModel.selectByRecipeId([id], (error, results) => {
              if (error) {
                res.status(500).json(error);
              } else {
                const steps = results;

                res.status(200).json({
                  ...recipeData,
                  ingredients: ingredients.length === 0 ? null : ingredients,
                  steps: steps.length === 0 ? null : steps,
                });
              }
            });
          }
        });
      }
    }
  });
};

const createRecipe = (req, res) => {
  const userId = res.locals.payload.id;
  const params = {
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    cooking_time: req.body.cooking_time,
    calories: req.body.calories,
    image_url: req.body.image_url,
    ingredients: JSON.parse(req.body.ingredients),
    steps: JSON.parse(req.body.steps),
  };

  categoryModel.selectByName([params.category], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        createCategory(req, res, (categoryId) => {
          recipeModel.create(
            [
              userId,
              categoryId,
              params.name,
              params.description,
              params.cooking_time,
              params.calories,
              params.image_url,
            ],
            (error, results) => {
              if (error) {
                res.status(500).json(error);
              } else {
                createIngredients(req, res, results.insertId);
              }
            }
          );
        });
      } else {
        recipeModel.create(
          [
            userId,
            results[0].id,
            params.name,
            params.description,
            params.cooking_time,
            params.calories,
            params.image_url,
          ],
          (error, results) => {
            if (error) {
              res.status(500).json(error);
            } else {
              createIngredients(req, res, results.insertId);
            }
          }
        );
      }
    }
  });
};

const createCategory = (req, res, callback) => {
  const category = req.body.category;

  categoryModel.create([category], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      callback(results.insertId);
    }
  });
};

const createIngredients = (req, res, recipeId) => {
  const ingredients = JSON.parse(req.body.ingredients);

  let count = 0;

  ingredients.forEach((ingredient, index, array) => {
    ingredientModel.create([recipeId, ingredient.name], (error, results) => {
      if (error) {
        res.status(500).json(error);
      }

      count += 1;

      if (count === array.length) {
        createSteps(req, res, recipeId);
      }
    });
  });
};

const createSteps = (req, res, recipeId) => {
  const steps = JSON.parse(req.body.steps);

  let count = 0;

  steps.forEach((step, index, array) => {
    stepModel.create(
      [recipeId, step.order_number, step.description],
      (error, results) => {
        if (error) {
          res.status(500).json(error);
        }

        count += 1;

        if (count === array.length) {
          res.status(200).json({
            message: "Recipe created.",
          });
        }
      }
    );
  });
};

module.exports = {
  getAllRecipes,
  getByParams,
  createRecipe,
};
