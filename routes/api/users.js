const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const { create } = require("../../db/user-repository")
const { User } = require('../../db/models');
const { authenticated, generateToken } = require('./security-utils');

const router = express.Router();

const email = check('email').isEmail().withMessage('Give a valid email address').normalizeEmail();
// const firstName = check('firstName').not().isEmpty().withMessage('Provide first name');
// const lastName = check('lastName').not().isEmpty().withMessage('Provide last name');
const password = check('password').not().isEmpty().withMessage('Provide a password');

router.post('/', email, password,
  asyncHandler(async function (req, res, next) {
    let message;
    const errors = validationResult(req).errors;
    let response = { user: {} };
    if (errors.length) {
      message = errors[0].msg;
    } else {
      let otherUser = await User.findOne({where: {email: req.body.email}});
      if (otherUser) {
        message = "That email is taken.";
      } else {
        const user = await create(req.body);
        const { jti, token } = generateToken(user);
        user.tokenId = jti;
        res.cookie("token", token);
        response.token = token;
        response.user = {...response.user, ...user.toSafeObject()}
        await user.save();
      }
    }
    response.user.message = message;
    res.json(response);
}));

router.put('/', email, password,
  asyncHandler(async function (req, res, next) {
  let user = await User.findByPk(req.body.id);
  const { jti, token } = generateToken(user);
  user.tokenId = jti;
  res.cookie("token", token);
  let message = "Success!";
  const errors = validationResult(req).errors;
  if (user.id === 1) {
    message = "You cannot edit my 'demo' user, whose details are needed in order to allow my site's visitors to login easily.  Feel free to use the 'Signup' route to create a new user if you'd like to test out the 'EditUser' route.";
  } else if (errors.length) {
    message = errors[0].msg;
  } else {
    let otherUser = await User.findOne({
      where: {
        [Sequelize.Op.and]: [
          {email: req.body.email},
          {[Sequelize.Op.not]: {id: user.id }}
        ]
      }
    });
    if (otherUser) {
      message = "That email is taken.";
    } else {
      user.email = req.body.email;
      user = user.setPassword(req.body.password);
    }
  }
  await user.save();
  res.json({ token, user: {...user.toSafeObject(), message }});
}));

router.get('/', asyncHandler(async function (req, res, next) {
    const users = await User.findAll();
    res.json(users);
}));

router.get('/me', authenticated, function(req, res) {
  res.json({ email: req.user.email });
});

router.delete("/:id", [authenticated], asyncHandler(async(req, res) => {
  const user = await User.findByPk(Number(req.params.id));
  if (user.id === 1) return res.json({ message: "You cannot delete my 'demo' user, because visitors to my site use that for testing purposes.  Create a new user via the 'Signup' route if you'd like to test out the deletion of a user." })
  user.tokenId = null;
  res.clearCookie('token');
  await user.destroy();
  res.json({});
}));

module.exports = router;
