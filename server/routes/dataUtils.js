const fs = require("fs/promises");
const path = require("path");

const readData = async () => {
  const pathFile = path.join(__dirname, "../models/data.json");
  const data = await fs.readFile(pathFile, "utf8");
  return JSON.parse(data);
};

const writeData = async (data) => {
  const pathFile = path.join(__dirname, "../models/data.json");
  await fs.writeFile(pathFile, JSON.stringify(data), "utf8");
};

module.exports = {
  writeData,
  readData,
};
