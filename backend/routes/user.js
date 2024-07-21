const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const { JWT_SECRET } = require("../config");

const userRouter = express.Router();
userRouter.use(express.json());

const signupSchema = zod.object({
  username: zod.string().min(3).max(30),
  password: zod.string().min(3).max(30),
  firstName: zod.string().min(3).max(30),
  lastName: zod.string().min(3).max(30),
});

const signinSchema = zod.object({
  username: zod.string().min(3).max(30),
  password: zod.string().min(3).max(30),
});

const updateSchema = zod.object({
  new_password: zod.string().min(3).max(30),
  updated_firstName: zod.string().min(3).max(30),
  updated_lastName: zod.string().min(3).max(30),
});

userRouter.get("/", (req, res) => {
  return res.json({ msg: "Hello World from userRouter" });
});

userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({ msg: "Invalid request" });
  }
  try {
    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });
    }
    const user = await User.create({
      username: body.username,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
    });
    await Account.create({
      userId: user._id,
      balance: Math.random() * 1000,
    });
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return res.json({ id: token });
  } catch (error) {
    console.log("./routes/user -> ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({ msg: "Invalid request" });
  }
  try {
    const user = await User.findOne({
      username: body.username,
      password: body.password,
    });
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    return res.json({ id: token });
  } catch (error) {
    console.log(e);
    return res.status(411).json({ msg: "invalid username or password" });
  }
});

userRouter.put("/update", middleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    return res.status(411), json({ msg: "Invalid inputs" });
  }
  try {
    await User.findOneAndUpdate(
      { _id: req.userId },
      {
        password: body.new_password,
        firstName: body.updated_firstName,
        lastName: body.updated_lastName,
      },
    );
    return res.json({ msg: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

userRouter.get("/bulk", middleware, async (req, res) => {
  const filter = req.query.filter || "";
  const { success } = zod.string().safeParse(filter);
  if (!success) {
    return res.status(411).json({ msg: "Invalid query" });
  }
  try {
    const users = await User.find({
      $or: [
        {
          firstName: { $regex: filter, $options: "i" },
        },
        {
          lastName: { $regex: filter, $options: "i" },
        },
      ],
    });

    return res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = userRouter;
