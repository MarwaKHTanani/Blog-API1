const express = require("express");
const app = express();
const path = require("path");


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
}); 

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"));
});

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
