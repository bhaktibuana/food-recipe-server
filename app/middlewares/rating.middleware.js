const checkRatingRange = (req, res, next) => {
  const rating = req.body.rating;

  if (rating < 1 || rating > 5) {
    res.status(400).json({
      message: "Rating must be between 1 and 5",
    });
  } else {
    next();
  }
};

module.exports = {
  checkRatingRange,
};
