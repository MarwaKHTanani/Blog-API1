const express = require("express");
const router = express.Router();
const { readData, writeData } = require("./dataUtils.js");
const { getAllPosts, addPost } = require("../controllers/blogPost.js");

router.get("/", getAllPosts);
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

router.post("/", addPost);

module.exports = router;
