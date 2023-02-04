import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userCard from "../models/userCard.js";
import validateToken from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(501).send(err);
    } else {
      userCard
        .create({
          username: username,
          password: hash,
        })
        .then((response) => res.send(response));
    }
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userCard.findOne({ username: username });

  if (!user) res.send({ err: "User not found" });

  bcrypt.compare(password, user.password, (err, data) => {
    if (!data) {
      res.send({ err: "Wrong username and password combination" });
    } else {
      const { sign } = jwt;

      const accessToken = sign(
        { username: user.username, id: user._id },
        "importantsecrettoken"
      );
      res
        .status(200)
        .send({ token: accessToken, username: user.username, id: user._id });
    }
  });
});
router.get("/auth", validateToken, (req, res) => {
  res.send(req.user);
});

router.get("/userId/:id", async (req, res) => {
  const userId = req.params.id;
  await userCard
    .findById(userId, { password: 0 })
    .then((response) => res.send(response));
});

export default router;
