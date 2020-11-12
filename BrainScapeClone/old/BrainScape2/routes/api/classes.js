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
  let classNew = await Class.create({...req.body, isPublic: false})
  await Subscription.create({userId: req.user.id, classId: classNew.id});
  res.json({class: classNew});
}));

router.get("/", asyncHandler(async function (req, res) {
  res.json({ classes: await Class.findAll({where: {isPublic: true}})})
}));

router.get("/:id", getCurrentUser, asyncHandler(async function (req, res) {
  const classOne = await Class.findByPk(req.params.id, {include: Subscription});
  if (!classOne) {
    res.json({message: "There is no such class."});
  } else {
    if (classOne.isPublic || classOne.Subscriptions[0].userId === req.user.id) {
      res.json({class: classOne});
    } else {
      res.json({message: "You are not authorized to view this info."})
    }
  }
}));

router.delete("/:id", getCurrentUser, asyncHandler(async(req, res) => {
  const classId = req.params.id;
  const userId = req.user.id;
  let classToDrop = await Class.findByPk(classId);
  if (!classToDrop) {
    res.json({ message: "There is no such class."});
  } else {
    const subscription = await Subscription.findOne({where: {[Op.and]: [{userId}, {classId}]}});
    if (!subscription) {
      res.json({ message: "You are not subscribed to this class."});
    } else {
      await subscription.destroy();
      classToDrop = await Class.findByPk(classId);
      if (classToDrop.isPublic) {
        res.json({message: "Subscription is cancelled."});
      } else {
        await classToDrop.destroy();
        res.json({message: "Both subscription and are cancelled."});
      }
    }
  }
}));

router.post("/:id/subscription", getCurrentUser, asyncHandler(async function (req, res) {
  const userId = req.user.id;
  const classId = req.params.id;
  const classChosen = await Class.findByPk(classId);
  if (!classChosen) {
    res.json({message: "There is no such class."});
  } else {
    const subscriptions = await Subscription.findAll({where: {[Op.and]: [{userId}, {classId}]}});
    if (subscriptions.length) {
      res.json({message: "You are already subscribed to this class."});
    } else {
      if (classChosen.isPublic) {
        res.json({subscription: await Subscription.create({classId, userId: req.user.id})});
      } else {
        res.json({message: "You do not have permission to subscribe to this class."});
      }
    }
  }
}));

module.exports = router;
