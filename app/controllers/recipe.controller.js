const recipeModel = require("../models/recipe.model");
const ingredientModel = require("../models/ingredient.model");
const stepModel = require("../models/step.model");

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
            for (let i in results) {
              results[i].image_url = `${req.protocol}://${req.get("host")}${
                results[i].image_url
              }`;
            }

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
              for (let i in results) {
                results[i].image_url = `${req.protocol}://${req.get("host")}${
                  results[i].image_url
                }`;
              }

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

module.exports = {
  getAllRecipes,
  getByParams,
};
