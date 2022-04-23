const categoryModel = require("../models/category.model");

const getCategory = (req, res) => {
  categoryModel.selectAll((error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  getCategory,
};
