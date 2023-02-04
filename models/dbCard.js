import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commentCard",
    },
  ],
  likes: [
    {
      type: String,
    },
  ],
});

const Cards = mongoose.model("Cards", cardSchema);

export default Cards;
