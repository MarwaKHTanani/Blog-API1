const express = require("express");
const router = express.Router();

const { readData, writeData } = require("./dataUtils");

router.get("/", async (req, res) => {
  try {
    const data = await readData();
    res.json(data.users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});
router.post("/", async (req, res) => {
  try {
    const { firstname, secondname, password } = req.body;
    if (!firstname || !secondname || !password) {
      return res.status(400).json({ message: "missing data" });
    }
    const data = await readData();
    const lastId = data.users.reduce(
      (max, user) => (user.id > max ? user.id : max),
      0
    );
    const newId = lastId + 1;
    const newUser = { id: newId, firstname, secondname, password };
    data.users.push(newUser);
    await writeData(data);
    res.status(201).json({ message: "user created :)" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
