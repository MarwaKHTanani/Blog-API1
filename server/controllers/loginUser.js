const { readData } = require("../routes/dataUtils");

const loginUser = async (req, res) => {
  try {
    const { firstname, password } = req.body;
    const data = await readData();
    const user = data.users.find(
      (u) => u.firstname === firstname && u.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
