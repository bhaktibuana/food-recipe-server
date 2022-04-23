const db = require("../../config/dbConnection");

const selectAll = (callback) => {
  const selectQuery = `SELECT id, name FROM categories WHERE is_deleted = FALSE;`;
  db.query(selectQuery, callback);
}

const selectByName = (params, callback) => {
  const selectQuery = `SELECT id, name FROM categories WHERE is_deleted = FALSE AND name = ?;`;
  db.query(selectQuery, params, callback);
};

const create = (params, callback) => {
  const insertQuery = `INSERT INTO categories (name) VALUES (?);`;
  db.query(insertQuery, params, callback);
};

module.exports = {
  selectAll,
  selectByName,
  create,
};
