import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import postRouter from "./routes/Posts.js";
import postByIdRouter from "./routes/PostById.js";
import commentsRouter from "./routes/Comments.js";
import userRouter from "./routes/User.js";
import likesRouter from "./routes/Like.js";

//App config
const app = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(express.json());
app.use(cors());

//DB config
const connect_url =
  "mongodb+srv://Roland90:Ogeleayo90.@cluster0.clw9xbz.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connect_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//API endpoints
app.use("/posts", postRouter);
app.use("/post", postByIdRouter);
app.use("/comments", commentsRouter);
app.use("/auth", userRouter);
app.use("/likes", likesRouter);

//Listener
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
