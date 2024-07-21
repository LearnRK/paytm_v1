const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

router.use(express());
router.use(express.json());
router.use("/user", userRouter);
router.use("/account", accountRouter);

router.get("/", (req, res) => {
  return res.json({ msg: "Hello World from indexRouter" });
});

module.exports = router;
