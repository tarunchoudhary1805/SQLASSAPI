const express = require("express");
const app = express();
const User = require("./questionSchema");
const port = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");

const db =
  "mongodb+srv://tarun1805:tarun1805@cluster0.srsra.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.use(cors());
app.use(express.json());
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((connected) => console.log("Successfully connect to DB"))
  .catch((err) => console.log(err));

app.post("/upload", async (req, res) => {
  const { name, email, Questions, rollNumber } = req.body;
  const existingUser = await User.findOne({ email });
  console.log("ex", existingUser);
  if (existingUser) {
    console.log("hello");
    res.status(422).json({ message: "User Already Exists" });
  }
  try {
    const newUser = await new User({ name, email, Questions, rollNumber });
    newUser.save();
    const data = await User.find();
    // console.log();
    res.json({ data, message: "Submitted Successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req, res) => {
  const data = await User.find();
  console.log(data);
  res.json(data);
});

app.listen(port, () => {
  console.log(`server started on port : ${port}`);
});
