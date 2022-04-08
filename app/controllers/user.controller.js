const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = (req, res) => {
  const params = {
    email: req.body.email,
    password: passwordHash(req.body.password),
  };

  userModel.selectByEmail([params.email, params.password], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(403).json({
          message: "Email or password is incorrect.",
        });
      } else {
        if (results[0]["is_deleted"] === 1) {
          res.status(403).json({
            message: "Your account has been deleted.",
          });
        } else {
          const token = jwt.sign(
            {
              id: results[0]["id"],
              name: results[0]["name"],
              email: results[0]["email"],
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "30d" }
          );

          res.status(200).json({
            message: "Login success.",
            access_token: token,
          });
        }
      }
    }
  });
};

const register = (req, res) => {
  const params = {
    name: req.body.name,
    email: req.body.email,
    password: passwordHash(req.body.password),
  };

  userModel.create(
    [params.name, params.email, params.password],
    (error, reuslts) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json({
          message: "Registration success.",
        });
      }
    }
  );
};

const passwordHash = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

module.exports = {
  login,
  register,
};
