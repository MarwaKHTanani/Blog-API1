const request = require("supertest");
const express = require("express");
const postRouter = require("../server/routes/posts");
const userRouter = require("../server/routes/users");

const app = express();
app.use(express.json());
app.use("/posts", postRouter);
app.use("/users", userRouter);

test("GET /posts/user/1 should return posts for userId = 1", (done) => {
  request(app)
    .get("/posts/user/1")
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      if (err) return done(err);

      expect(Array.isArray(res.body)).toBe(true);

      if (res.body.length > 0) {
        res.body.forEach((post) => {
          expect(post.userId).toBe(1);
        });
      }

      done();
    });
});

test("GET /posts should return all blog posts", (done) => {
  request(app)
    .get("/posts")
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(Array.isArray(res.body)).toBe(true);
      if (res.body.length > 0) {
        res.body.forEach((post) => {
          expect(post).toHaveProperty("title");
          expect(post).toHaveProperty("content");
        });
      }

      done();
    });
});

test("GET /users should return all users", (done) => {
  request(app)
    .get("/users")
    .expect(200)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      if (err) return done(err);

      expect(Array.isArray(res.body)).toBe(true);

      if (res.body.length > 0) {
        res.body.forEach((user) => {
          expect(user).toHaveProperty("id");
          expect(user).toHaveProperty("firstname");
          expect(user).toHaveProperty("secondname");
          expect(user).toHaveProperty("password");
        });
      }

      done();
    });
});

test("POST /users/register should create a new user", (done) => {
  const newUser = {
    firstname: "Test",
    secondname: "User",
    password: "test123",
  };

  request(app)
    .post("/users/register")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /json/)
    .end((err, res) => {
      if (err) return done(err);

      expect(res.body).toHaveProperty("message", "User created successfully");
      expect(res.body).toHaveProperty("user");
      expect(res.body.user.firstname).toBe(newUser.firstname);
      expect(res.body.user.secondname).toBe(newUser.secondname);
      expect(res.body.user.password).toBe(newUser.password);

      done();
    });
});
