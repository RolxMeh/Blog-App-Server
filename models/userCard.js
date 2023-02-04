import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userCard = mongoose.model("userCard", cardSchema);

export default userCard;
