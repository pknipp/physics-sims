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
// firstName, lastName,
  asyncHandler(async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next({ status: 422, errors: errors.array() });
  const user = await create(req.body);
  const { jti, token } = generateToken(user);
  user.tokenId = jti;
  await user.save();
  res.cookie("token", token);
  res.json({ token, user: user.toSafeObject() });
}));

router.put('/', email, password,
// firstName, lastName,
  asyncHandler(async function (req, res, next) {
  let success = "Success!";
  let user = await User.findByPk(req.body.id);
  const { jti, token } = generateToken(user);
  user.tokenId = jti;
  res.cookie("token", token);
  let message;
  const errors = validationResult(req).errors;
  // console.log("errors = ", errors);
  // console.log("errors.errors = ", errors.errors)
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
      message = "Success!";
      user.email = req.body.email;
      user = user.setPassword(req.body.password);
      await user.save();
    }
  }
  res.json({ token, user: {...user.toSafeObject(), message }});
  }));

// router.put('/', email, password,
// // firstName, lastName,
//   asyncHandler(async function (req, res, next) {
//   let success = "Success!";
//   const errors = validationResult(req);
//   let message = errors.array()[0];
//   message = message ? message.msg : success;
//   // if (!errors.isEmpty()) return next({ status: 422, errors: errors.array() });
//   let user = await User.findByPk(req.body.id);
//   if(user.id === 1) {
//     // res.status(404).json({errors: ["You can not edit the details of the demo user!"]})
//     return res.json({ token, {...user.toSafeObject(), message })
//   } else {
//     if (message === success) user.email = req.body.email;
//     user = user.setPassword(req.body.password);
//     const { jti, token } = generateToken(user);
//     user.tokenId = jti;
//     await user.save();
//     res.cookie("token", token);
//     res.json({ token, user: {...user.toSafeObject(), message }});
//   }
// }));

// router.put(
//   "/edit",
//   csrfProtection,
//   validateAuthFields,
//   handleValidationErrors,
//   routeHandler(async (req, res, next) => {
//     const token = req.cookies.token;
//     const user = await User.findByPk(jwt.verify(token, secret).id);
//     if(user.firstName === "Demo" || user.lastName === "User" || user.id === "2" || user.email === "demo@user.io") {
//       res.status(404).json({errors: ["You can not edit the details of the demo user!"]})
//     } else {
//       user.firstName = req.body.firstName;
//       user.lastName = req.body.lastName;
//       user.email = req.body.email;
//       user.phone = req.body.phone;
//       user.hashedPassword = bcrypt.hashSync(req.body.password, 10);

//       await user.save();
//       res.cookie("token", req.cookies.token, { maxAge: expiresIn * 1000 });
//       // Is following step really needed?  (PK)
//       res.json({ id: user.id, token });
//     }

//   })
// );

router.get('/', asyncHandler(async function (req, res, next) {
    const users = await User.findAll();
    res.json(users);
}));

router.get('/me', authenticated, function(req, res) {
  res.json({ email: req.user.email,
    // firstName: req.user.firstName, lastName: req.user.lastName
  });
});

router.delete("/:id", [authenticated], asyncHandler(async(req, res) => {
  // console.log("top of back-end delete route")
  const user = await User.findByPk(Number(req.params.id));
  if (user.id === 1) return res.json({ message: "You cannot delete my 'demo' user, because visitors to my site use that for testing purposes.  Create a new user via the 'Signup' route if you'd like to test out the deletion of a user." })
  user.tokenId = null;
  res.clearCookie('token');
  // console.log("line before user is deleted in db")
  await user.destroy();
  res.json({ message: "" });
}));

module.exports = router;
