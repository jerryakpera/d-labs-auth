const express = require('express');

const router = express.Router();
const {
  userValidationRules,
  validate,
} = require('../middleware/validator/registerValidator');
const registerController = require('../controllers/registerController');
const registerValidator = require('../middleware/validator/registerValidator');

router.post(
  '/user',
  registerValidator.registerUserRules(),
  registerValidator.validate,
  registerController.registerUser
);

module.exports = router;
