const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const coffeeRoutes = require("./routes/coffeeRoutes");
const {signUpUser, loginUser} = require("./controllers/authcontroller");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(express.json());
app.use(cors());

app.use("/coffee", coffeeRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/signup", async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({error: "Email and password are required"});
  }
  try {
    const user = await signUpUser(email, password);
    res.status(201).json({message: "User signed up successfully", user});
  } catch (error) {
    const statusCode = error.isClientError ? 400 : 500;
    res.status(statusCode).json({error: error.message});
  }
});

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({error: "Email and password are required"});
  }
  try {
    const user = await loginUser(email, password);
    res.status(200).json({message: "User logged in successfully", user});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});