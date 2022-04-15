const db = require("../../config/dbConnection");

const selectByRecipeId = (params, callback) => {
  const selectQuery = `SELECT recipe_id, name FROM ingredients WHERE is_deleted = FALSE AND recipe_id = ? ORDER BY id ASC;`;
  db.query(selectQuery, params, callback);
};

const create = (params, callback) => {
  const insertQuery = `INSERT INTO ingredients (recipe_id, name) VALUES (?, ?);`;
  db.query(insertQuery, params, callback);
};

module.exports = {
  selectByRecipeId,
  create,
};
