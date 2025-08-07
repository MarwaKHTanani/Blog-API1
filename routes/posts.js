const express = require("express");
const router = express.Router();
const { readData, writeData } = require("./dataUtils");

router.get("/", async (req, res) => {
  try {
    const data = await readData();
    res.json(data.posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const data = await readData();
    const id = req.params.userId;
    const filterPost = data.posts.filter((post) => post.userId == id);
    res.json(filterPost);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    if (!userId || !title || !content) {
      return res.status(400).json({ message: "missing data" });
    }
    const data = await readData();
    const newPost = { userId, title, content };
    data.posts.push(newPost);
    await writeData(data);
    res.status(201).json({ message: "post created :)" });
  } catch (error) {
    res.status(500).json({ message: "server error " });
  }
});

module.exports = router;
