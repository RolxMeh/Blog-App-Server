import express from "express";

import validateToken from "../middlewares/AuthMiddlewares.js";
import Card from "../models/dbCard.js";

const router = express.Router();

router.get("/", (req, res) => {
  Card.find({}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/", validateToken, (req, res) => {
  const input = req.body;

  input.username = req.user.username;
  input.userId = req.user.id;

  Card.create(input, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.get("/byUserId/:id", (req, res) => {
  const userId = req.params.id;
  Card.find({ userId: userId }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.delete("/:postId", validateToken, (req, res) => {
  const postId = req.params.postId;

  Card.findOneAndDelete({ _id: postId })
    .then((response) => res.send(response))
    .catch((err) => console.log(err));
});
export default router;
