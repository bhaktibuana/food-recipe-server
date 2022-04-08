const express = require("express");
const recipeController = require("../controllers/recipe.controller");

const router = express.Router();

router.get("/recipe", recipeController.getAllRecipes);
router.get("/recipe/:endpoint", recipeController.getByParams); // endpoint cant be category or id

module.exports = router;
