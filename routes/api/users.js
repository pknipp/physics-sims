const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
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
  const errors = validationResult(req);
  let message = errors.array()[0];
  message = message ? message.msg : success;
  // if (!errors.isEmpty()) return next({ status: 422, errors: errors.array() });
  let user = await User.findByPk(req.body.id);
  if(user.id === 1) {
    res.status(404).json({errors: ["You can not edit the details of the demo user!"]})
  } else {
    if (message === success) user.email = req.body.email;
    user = user.setPassword(req.body.password);
    const { jti, token } = generateToken(user);
    user.tokenId = jti;
    await user.save();
    res.cookie("token", token);
    res.json({ token, user: {...user.toSafeObject(), message }});
  }
  // const user = await create(req.body);
  const { jti, token } = generateToken(user);
  user.tokenId = jti;
  await user.save();
  res.cookie("token", token);
  res.json({ token, user: user.toSafeObject() });
}));

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

router.delete("/", [authenticated], asyncHandler(async(req, res) => {
  const user = await User.findByPk(req.user.id,
    //  {include: [Subscription, Class]}
    );
  //ONLY DELETE PRIVATE RESOURCES, AND LOGOUT AFTERWARDS
  // subscriptions must be destroyed before the user and any private classes
  //console.log("subscriptions are ", user.Subscriptions.dataValues);
  // console.log(user.Subscriptions.length);
  // user.Subscriptions.forEach(async subscription => await subscription.destroy());
  // for (const classFound of user.Classes) {
    //of course only private classes are deleted
    // if (classFound.isPublic) continue;
    // const classId = classFound.id;
    // decks, cards, and histories must be deleted prior to classes
    // const decks = await Deck.findAll({where: {classId}});
    // for (const deck of decks) {
      // const deckId = deck.id;
      // const cards = await Card.findAll({where: {deckId}});
      // for (const card of cards) {
        // const histories = await History.findAll({where: {cardId: card.id}});
        // histories.forEach(async history => await history.destroy())
        // await card.destroy();
    //   }
    //   await deck.destroy();
    // }
    // await classFound.destroy();
  //}
  await user.destroy();
  req.user.tokenId = null;
  res.clearCookie('token');
  res.json({ message: "farewell" });
}));

module.exports = router;
