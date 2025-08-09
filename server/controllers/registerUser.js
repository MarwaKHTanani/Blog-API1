const { readData, writeData } = require("../routes/dataUtils");

const registerUser = async (req, res) => {
  try {
    const { firstname, secondname, password } = req.body;

    if (!firstname || !secondname || !password) {
      return res.status(400).json({ message: "Missing data" });
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
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    console.error("REGISTER ERROR:", error.message);

    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };
