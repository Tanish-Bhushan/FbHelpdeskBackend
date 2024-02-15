const connectDatabase = require("./database/connection");
const userModel = require("./database/schema");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const cors = require("cors");

connectDatabase();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const { username, email } = req.body;
  var ifUserPresent = await userModel.findOne({ username });
  ifUserPresent = await userModel.findOne({ email });
  if (ifUserPresent) {
    return res.json({ message: "300" });
  }
  const user = new userModel();

  user.username = req.body.username;
  user.email = req.body.email;
  user.password = await bcrypt.hash(req.body.password, 10);
  await user.save();
  res.json({ message: "Account created successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ message: "300" });
  }
  if (bcrypt.compareSync(user.password, password)) {
    return res.json({ message: "400" });
  }
  res.json({ message: "LoggedIn successfully" });
});

app.listen(5000, () => {
  console.log("Server is live...");
});
