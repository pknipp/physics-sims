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
const { DECIMAL } = require('sequelize');

const router = express.Router();

router.post("/", getCurrentUser, asyncHandler(async function (req, res) {
  const deckId = req.body.deckId;
  const deck = await Deck.findByPk(deckId);
  if (!deck) {
    res.json({message: "There is no such deck."});
  } else {
    const classFound = await Class.findOne({where: {id: deck.classId}});
    const userId = req.user.id;
    const subscription = await Subscription.findOne({where: {[Op.and]: [{userId}, {classId: classFound.id}]}});
    if (classFound.isPublic || !subscription) {
      res.json({message: "You are not authorized to create a card in this deck."});
    } else {
      const card = await Card.create(req.body)
      res.json(card);
    }
  }
}))

router.get("/:id", getCurrentUser, asyncHandler(async function (req, res) {
  const userId = req.user.id;
  const cardId = req.params.id;
  const card = await Card.findByPk(cardId);
  if (!card) {
    res.json({message: "There is no such card."});
  } else {
    const deck = await Deck.findByPk(card.deckId);
    const classFound = await Class.findByPk(deck.classId);
    const subscription = await Subscription.findOne({where: {[Op.and]: [{userId}, {classId: classFound.id}]}});
    if (classFound.isPublic || subscription) {
      res.json(card);
    } else {
      res.json({message: "You are not authorized to view this card."});
    }
  }
}));

router.put("/:id", getCurrentUser, asyncHandler(async (req, res) => {
  const cardId = req.params.id;
  let card = await Card.findByPk(cardId);
  if (!card) {
    res.json({message: "There is no such card."});
  } else {
    const deck = await Deck.findByPk(card.deckId);
    const classFound = await Class.findByPk(deck.classId);
    const subscription = await Subscription.findOne({where: {[Op.and]: [{userId: req.user.id}, {classId: classFound.id}]}});
    if (classFound.isPublic || !subscription) {
      res.json({message: "You are not authorized to edit this card."});
    } else {
      await card.update({...card, ...req.body})
      res.json(card);
    }
  }
}));

router.put("/:id/confidence", getCurrentUser, asyncHandler(async (req, res) => {
  const cardId = req.params.id;
  confidence = req.body.confidence;
  const card = await Card.findByPk(cardId);
  if (!card) {
    res.json({ message: "There is no such card." });
  } else {
    const deck = await Deck.findByPk(card.deckId);
    const classFound = await Class.findByPk(deck.classId);
    const userId = req.user.id;
    const subscription = await Subscription.findOne({where: {[Op.and]: [{userId, classId: classFound.id}]}});
    if (!subscription) {
      res.json({message: "Because of no subscription, you have no reason to express a confidence-level in this question."});
    } else {
      const confidence1 = confidence;
      const history = await History.findOne({where: {[Op.and]: [{userId, cardId}]}});
      if (history) {
        const confidence2 = history.confidence1;
        await history.update({confidence1, confidence2});
        confAvg = confidence1/2 + confidence2/2;
      } else {
        await History.create({userId, cardId, confidence1});
        confAvg = confidence;
      }
      res.json({ confAvg });
    }
  }
}));

router.delete("/:id", getCurrentUser, asyncHandler(async(req, res) => {
  const cardId = req.params.id;
  const card = await Card.findByPk(cardId, {include: History});
  if (!card) {
    res.json({ message: "There is no such card."});
  } else {
    const deck = await Deck.findByPk(card.deckId);
    const classFound = await Class.findByPk(deck.classId);
    const userId = req.user.id;
    const subscription = await Subscription.findOne({where: {[Op.and]: [{userId}, {classId: classFound.id}]}});
    if (classFound.isPublic || !subscription) {
      res.json({message: "This is not your card to delete."});
    } else {
      if (card.Histories.length) {
        await card.Histories[0].destroy();
        await card.destroy();
        res.json({message: "Card and history are now gone."});
      } else {
        await card.destroy();
        res.json({message: "Card is now gone."});
      }
    }
  }
}));

module.exports = router;
