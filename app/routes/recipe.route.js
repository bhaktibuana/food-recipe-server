const express = require("express");
const recipeController = require("../controllers/recipe.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/recipe", recipeController.getAllRecipes);
router.get("/recipe/:endpoint", recipeController.getByParams); // endpoint can be category or id
router.post(
  "/recipe",
  authMiddleware.isAuthenticate,
  recipeController.createRecipe
);

module.exports = router;
