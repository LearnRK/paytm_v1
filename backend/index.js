const express = require("express");
const router = require("./routes/index");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "Hello World" });
});

app.use("/api/v1", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
