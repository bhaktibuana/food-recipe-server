const ratingModel = require("../models/rating.model");

const getRatingByRecipe = (req, res) => {
  const recipeId = req.params.recipe_id;

  ratingModel.countByRecipe([recipeId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      const count = results[0].count;

      if (count === 0) {
        res.status(200).json({
          total_vote: 0,
          rating: 0,
        });
      } else {
        ratingModel.getByRecipe([recipeId], (error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            res.status(200).json({
              total_vote: count,
              rating: results[0].rating,
            });
          }
        });
      }
    }
  });
};

const getRatingByUser = (req, res) => {
  const recipeId = req.params.recipe_id;
  const userId = req.query.user_id;

  ratingModel.getByUser([recipeId, userId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(200).json({
          rating: 0,
        });
      } else {
        res.status(200).json({
          rating: results[0].rating,
        });
      }
    }
  });
};

const createAndUpdateRating = (req, res) => {
  const recipeId = req.params.recipe_id;
  const userId = req.body.user_id;
  const rating = req.body.rating;

  ratingModel.getByUser([recipeId, userId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        ratingModel.create([recipeId, userId, rating], (error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            res.status(201).json({
              message: "Rating created successfully",
            });
          }
        });
      } else {
        ratingModel.edit([rating, recipeId, userId], (error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            res.status(200).json({
              message: "Rating updated successfully",
            });
          }
        });
      }
    }
  });
};

module.exports = {
  getRatingByRecipe,
  getRatingByUser,
  createAndUpdateRating,
};
