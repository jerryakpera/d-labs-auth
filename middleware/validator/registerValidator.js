const { body, validationResult } = require('express-validator');
const registerUserRules = () => {
  return [
    body('name').isLength({ min: 6 }).withMessage('Name must be 6 characters'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be longer than 8 characters')
      .matches(/\d/)
      .withMessage('Password must contain a number')
      .matches(/^[a-z]/i)
      .withMessage('Password must start with a letter')
      .equals('confirmpassword')
      .withMessage('Passwords must match'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registerUserRules,
  validate,
};
