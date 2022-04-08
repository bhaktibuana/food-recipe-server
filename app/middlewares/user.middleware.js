const userModel = require("../models/user.model");
const yup = require("yup");

const loginValidation = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

const registerValidation = (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
  };

  const schema = yup.object().shape({
    name: yup.string().max(50).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    password_confirmation: yup
      .string()
      .min(8)
      .matches(data.password, "password does not match")
      .required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

module.exports = {
  loginValidation,
  registerValidation,
};
