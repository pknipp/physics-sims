const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../../config').jwtConfig;

const db = require('../../db/models');

const { User } = db;

exports.getUserToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secret,
    { expiresIn: parseInt(expiresIn) });
};

exports.getUserFromToken = async (token) => {
  try {
    return await User.findByPk(jwt.verify(token, secret).id);
  } catch(err) {
    return null;
  }
}

exports.requireUser = (req, res, next) => {
  if (req.user) return next();
  const err = Error("Unauthorized");
  err.status = 401;
  err.title = "Unauthorized";
  next(err);
}
