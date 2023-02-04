import express from "express";
import commentCard from "../models/commentCard.js";
import Card from "../models/dbCard.js";

const router = express.Router();

router.get("/byId/:id", (req, res) => {
  const postId = req.params.id;

  Card.find({ _id: postId }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

export default router;
