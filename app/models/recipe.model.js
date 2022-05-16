const db = require("../../config/dbConnection");

const countAll = (callback) => {
  const selectQuery = `SELECT COUNT(*) AS count FROM recipes WHERE is_deleted = FALSE;`;
  db.query(selectQuery, callback);
};

const selectAll = (params, callback) => {
  const selectQuery = `SELECT re.id, ca.name AS category, re.name, re.cooking_time, re.calories, (SELECT AVG(rating) FROM rating WHERE recipe_id = re.id AND is_deleted = FALSE) AS rating, re.image_url FROM recipes AS re JOIN categories AS ca ON re.category_id = ca.id WHERE re.is_deleted = FALSE ORDER BY re.id ASC LIMIT ?, ?;`;
  db.query(selectQuery, params, callback);
};

const countByCategory = (params, callback) => {
  const selectQuery = `SELECT COUNT(*) AS count FROM recipes AS re JOIN categories AS ca ON re.category_id = ca.id WHERE re.is_deleted = FALSE AND ca.name = ?;`;
  db.query(selectQuery, params, callback);
};

const selectByCategory = (params, callback) => {
  const selectQuery = `SELECT re.id, ca.name AS category, re.name, re.cooking_time, re.calories, (SELECT AVG(rating) FROM rating WHERE recipe_id = re.id AND is_deleted = FALSE) AS rating, re.image_url FROM recipes AS re JOIN categories AS ca ON re.category_id = ca.id WHERE re.is_deleted = FALSE AND ca.name = ? ORDER BY re.id ASC LIMIT ?, ?;`;
  db.query(selectQuery, params, callback);
};

const selectById = (params, callback) => {
  const selectQuery = `SELECT re.id, us.name AS username, ca.name AS category, re.name, re.description, re.cooking_time, re.calories, (SELECT AVG(rating) FROM rating WHERE recipe_id = re.id AND is_deleted = FALSE) AS rating, re.image_url, re.created_at, re.updated_at FROM recipes AS re JOIN categories AS ca ON re.category_id = ca.id JOIN users AS us ON re.user_id = us.id WHERE re.is_deleted = FALSE AND re.id = ?;`;
  db.query(selectQuery, params, callback);
};

const create = (params, callback) => {
  const insertQuery = `INSERT INTO recipes (user_id, category_id, name, description, cooking_time, calories, image_url) VALUES (?, ?, ?, ?, ?, ?, ?);`;
  db.query(insertQuery, params, callback);
};

module.exports = {
  countAll,
  selectAll,
  countByCategory,
  selectByCategory,
  selectById,
  create,
};
