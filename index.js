const connectDatabase = require("./database/connection");
const userModel = require("./database/schema");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const cors = require("cors");
let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
connectDatabase();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const { username, email } = req.body;
  if (!emailRegex.test(req.body.email)) {
    return res.json({ message: "300" });
    
  }
  const ifUserPresentWithSameName = await userModel.findOne({ username });
  const ifUserPresentWithSameEmail = await userModel.findOne({ email });

  if (ifUserPresentWithSameName) {
    return res.json({ message: "301" });
  }
  if (ifUserPresentWithSameEmail) {
    return res.json({ message: "302" });
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
