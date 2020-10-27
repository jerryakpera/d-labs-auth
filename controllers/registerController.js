const createError = require('http-errors');

const _ = require('../utils/utils');

module.exports = {
  registerUser(req, res, next) {
    const user = req.body;

    return res.json({
      message: 'OK!',
    });
  },
};
