const express = require("express");
const recipeRouter = require("./recipe.route");
const userRouter = require("./user.route");

const router = express.Router();

router.use("/", recipeRouter);
router.use("/", userRouter);

router.use("/", (req, res) => {
  res.status(200).json({
    message: "Food Recipe API Server.",
  });
});

module.exports = router;
