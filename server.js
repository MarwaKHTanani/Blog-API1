const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
