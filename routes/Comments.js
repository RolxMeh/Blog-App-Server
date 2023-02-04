import express from "express";
import commentCard from "../models/commentCard.js";
import Card from "../models/dbCard.js";
import validateToken from "../middlewares/AuthMiddlewares.js";

const router = express.Router();

router.get("/:postId", (req, res) => {
  const postId = req.params.postId;

  Card.findOne({ _id: postId })
    .populate("comments")
    .then((response) => res.send(response.comments));
});

router.post("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  const commentBody = req.body.commentBody;
  const username = req.user.username;
  const newComment = await commentCard.create({
    commentBody: commentBody,
    userComment: username,
  });

  const newCommentId = newComment._id;

  const post = await Card.findOne({ _id: postId });

  const addComment = post.comments;
  addComment.push(newCommentId);

  post
    .save()
    .then((response) => {
      res.status(201).send({ response: response, postId: postId });
    })
    .catch((err) => console.log(err));
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  const thePostId = req.header("thePostId");

  await Card.updateOne({ thePostId }, { $pull: { comments: commentId } });

  await commentCard
    .findOneAndDelete({ _id: commentId })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => console.log(err));
});
export default router;
