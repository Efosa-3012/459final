import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { usersRouter } from "./routes/users.js";
import { booksRouter } from "./routes/books.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", usersRouter);
app.use("/books", booksRouter);

mongoose.connect(
  "mongodb+srv://efisu1:Pochita30.12@library.znhfo0t.mongodb.net/library?retryWrites=true&w=majority"
);

app.listen(3001, () => {
  console.log("Server started at port 3001");
});
