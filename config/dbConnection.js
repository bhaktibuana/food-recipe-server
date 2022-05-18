const mysql = require("mysql");

const db = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net", // "localhost" by default
  user: "b1dca192047f52", // "root" by default
  password: "d34acfb8",
  database: "heroku_06a741d3968ca32",
});

module.exports = db;
