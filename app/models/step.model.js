const db = require("../../config/dbConnection");

const selectByRecipeId = (params, callback) => {
  const selectQuery = `SELECT recipe_id, order_number, description FROM steps WHERE is_deleted = FALSE AND recipe_id = ? ORDER BY order_number ASC;`;
  db.query(selectQuery, params, callback);
};  

module.exports = {
  selectByRecipeId,
};
