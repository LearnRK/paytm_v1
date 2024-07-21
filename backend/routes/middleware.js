const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");

const middleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const tokenType = authHeader.split(" ")[0];
  const token = authHeader.split(" ")[1];
  const decode = jwt.verify(token, JWT_SECRET);
  if (!decode.id | (tokenType !== "Bearer")) {
    return res.status(403).json({ msg: "invalid token" });
  }
  try {
    req.userId = (await User.findById(decode.id))._id;
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = middleware;
