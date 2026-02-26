const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/loginUser");
const { readData, writeData } = require("./dataUtils");
const { registerUser } = require("../controllers/registerUser");

router.get("/", async (req, res) => {
  try {
    const data = await readData();
    res.json(data.users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;
