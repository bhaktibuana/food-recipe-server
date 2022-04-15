const express = require("express");
const ratingController = require("../controllers/rating.controller");
const ratingMiddleware = require("../middlewares/rating.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/rating/recipe/:recipe_id", ratingController.getRatingByRecipe);
router.get(
  "/rating/user/:recipe_id",
  authMiddleware.isAuthenticate,
  ratingController.getRatingByUser
);
router.post(
  "/rating/:recipe_id",
  authMiddleware.isAuthenticate,
  ratingMiddleware.checkRatingRange,
  ratingController.createAndUpdateRating
);

module.exports = router;
