import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  userComment: String,
  commentBody: {
    type: String,
    required: true,
  },
});

const commentCard = mongoose.model("commentCard", cardSchema);

export default commentCard;
