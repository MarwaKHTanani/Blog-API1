const { readData, writeData } = require("../routes/dataUtils");

const getAllPosts = async (req, res) => {
  try {
    const data = await readData();
    res.json(data.posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addPost = async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing title or content" });
    }

    const data = await readData();
    const newPost = { userId: userId || null, title, content };
    data.posts.push(newPost);

    await writeData(data);
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllPosts,
  addPost,
};
