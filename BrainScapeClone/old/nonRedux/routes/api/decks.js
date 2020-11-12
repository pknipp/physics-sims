const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require("express-validator");
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { User, Class, Subscription, Deck, Card, History } = require("../../db/models");
const { handleValidationErrors } = require("../util/validation");
const { getCurrentUser, generateToken } = require("../util/auth");
const {
  jwtConfig: { expiresIn },
} = require("../../config");

const router = express.Router();

router.post("/", getCurrentUser, asyncHandler(async function (req, res) {
  const classId = req.body.classId;
  const classFound = await Class.findByPk(classId);
  if (!classFound) {
    res.json({message: "There is no such class."});
  } else {
    const userId = req.user.id;
    const subscription = await Subscription.findOne({where: {[Op.and]: [{userId}, {classId: classFound.id}]}});
    if (classFound.isPublic || !subscription) {
      res.json({message: "You are not authorized to create a deck in this class."});
    } else {
      const deck = await Deck.create(req.body)
      res.json(deck);
    }
  }
}))

router.get("/:classId/:deckIds", getCurrentUser, asyncHandler(async function (req, res) {
  const userId = req.user.id;
  const classId = Number(req.params.classId);
  const classChosen = await Class.findByPk(classId);
  if (!classChosen) {
    res.json({message: "There is no such class."});
  } else {
    const subscriptions = await Subscription.findAll({where: {[Op.and]: [{userId}, {classId}]}});
    if (!subscriptions.length) {
      res.json({message: "You are not subscribed to this class."});
    } else {
      const deckIds = req.params.deckIds.split("&");
      const decks = [];
      for (const deckId of deckIds) {
        const deck = await Deck.findByPk(Number(deckId));
        if (!deck) res.json({message: "One or more of these decks do/does not exist."})
        if (deck.classId !== classId) return res.json({message: "One or more of these decks is/are not in this class."});
        decks.push(deck);
      }
      res.json(decks);
    }
  }
}));

router.delete("/:id", getCurrentUser, asyncHandler(async(req, res) => {
  const deckId = req.params.id;
  const deck = await Deck.findByPk(deckId);
  if (!deck) {
    res.json({ message: "There is no such deck."});
  } else {
    const classFound = await Class.findByPk(deck.classId);
    const userId = req.user.id;
    const subscription = await Subscription.findOne({where: {[Op.and]: [{userId}, {classId: classFound.id}]}});
    if (classFound.isPublic || !subscription) {
      res.json({message: "This is not your deck to delete."});
    } else {
      await deck.destroy();
      res.json({message: "Deck is now gone."});
    }
  }
}));

module.exports = router;
