const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require("express-validator");
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

const { User, Class, Subscription, Deck, Card, History } = require("../../db/models");
const { handleValidationErrors } = require("../util/validation");
const { getCurrentUser, generateToken } = require("../util/auth");
const {
  jwtConfig: { expiresIn },
} = require("../../config");

const validateSignup = [check("email", "must be a valid email").exists().isEmail(),
  check("password", "must be 6 or more characters").exists().isLength({ min: 6, max: 70 }),
  check('confirmPassword', 'must have the same value as the password field')
    .custom((value, { req }) => value === req.body.password)
];

const router = express.Router();

router.post("/", validateSignup, handleValidationErrors,
  asyncHandler(async function (req, res) {
    const user = await User.signup(req.body);
    const token = await generateToken(user);
    res.cookie("token", token, {maxAge: expiresIn * 1000, httpOnly: true,
      secure: process.env.NODE_ENV === "production"});
    return res.json({user});
  })
);

router.get("/", getCurrentUser,
  asyncHandler(async function (req, res) {return res.json({user: req.user || {message: "No one is logged in."} })})
);

router.put("/", validateSignup, handleValidationErrors, getCurrentUser,
  asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id);
    await user.update({...req.body, hashedPassword: bcrypt.hashSync(password, 10)})
    res.json({ user });
  })
);

 router.delete("/", getCurrentUser, asyncHandler(async(req, res) => {
   const user = await User.findByPk(req.user.id, {include: [Subscription, Class]});
   //ONLY DELETE PRIVATE RESOURCES, AND LOGOUT AFTERWARDS
   // subscriptions must be destroyed before the user and any private classes
   user.Subscriptions.forEach(async subscription => await subscription.destroy());
   for (const classFound of user.Classes) {
     const classId = classFound.id;
     // decks, cards, and histories must be deleted prior to classes
     const decks = await Deck.findAll({where: {classId}});
     for (const deck of decks) {
       const deckId = deck.id;
       const cards = await Card.findAll({where: {deckId}});
       for (const card of cards) {
         const cardId = card.id;
         const histories = await History.findAll({where: {cardId}});
         for (const history of histories) {
           await history.destroy();
         }
         await card.destroy();
       }
       await deck.destroy();
     }
     await classFound.destroy();
   }
   await user.destroy();
   res.json({ message: "farewell" });
 }));

module.exports = router;
