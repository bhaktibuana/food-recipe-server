const db = require("../../config/dbConnection");

const countByRecipe = (params, callback) => {
  const selectQuery = `SELECT COUNT(*) AS count FROM rating WHERE is_deleted = FALSE AND recipe_id = ?;`;
  db.query(selectQuery, params, callback);
};

const getByRecipe = (params, callback) => {
  const selectQuery = `SELECT AVG(rating) AS rating FROM rating WHERE is_deleted = FALSE AND recipe_id = ?;`;
  db.query(selectQuery, params, callback);
};

const getByUser = (params, callback) => {
  const selectQuery = `SELECT rating FROM rating WHERE is_deleted = FALSE AND recipe_id = ? AND user_id = ?;`;
  db.query(selectQuery, params, callback);
};

const create = (params, callback) => {
  const insertQuery = `INSERT INTO rating (recipe_id, user_id, rating) VALUES (?, ?, ?);`;
  db.query(insertQuery, params, callback);
};

const edit = (params, callback) => {
  const updateQuery = `UPDATE rating SET rating = ? WHERE recipe_id = ? AND user_id = ?;`;
  db.query(updateQuery, params, callback);
};

module.exports = {
  countByRecipe,
  getByRecipe,
  getByUser,
  create,
  edit,
};
