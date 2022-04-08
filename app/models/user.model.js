const db = require("../../config/dbConnection");

const selectByEmail = (params, callback) => {
  const selectQuery = `SELECT id, name, email FROM users WHERE email = ? AND password = ?;`;
  db.query(selectQuery, params, callback);
};

const create = (params, callbacl) => {
  const insertQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?);`;
  db.query(insertQuery, params, callbacl);
};

module.exports = {
  selectByEmail,
  create,
};
