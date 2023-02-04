import express from "express";
import Card from "../models/dbCard.js";
import validateToken from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.post("/:postId", validateToken, async (req, res) => {
  const { userId } = req.user;

  const postId = req.params.postId;

  const post = await Card.findOne({ _id: postId });
  Card.updateOne({ _id: postId }, { $inc: { likes: userId } }).then(
    (response) => res.send("Liked")
  );

  const postLike = post.likes;

  const likeStatus = await postLike.findById(userId);

  if (!likeStatus) {
    Card.updateOne({ _id: postId }, { $inc: { likes: userId } }).then(
      (response) => res.send("Liked")
    );
  } else {
    Card.updateOne({ _id: postId }, { $pull: { likes: userId } }).then(
      (response) => res.send("Unliked")
    );
  }
});

export default router;
