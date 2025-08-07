const request = require("supertest");
const express = require("express");
const postRouter = require("../server/routes/posts");

const app = express();
app.use(express.json());
app.use("/posts", postRouter);

test("GET /users/user/1 should return posts for userId = 1", (done) => {
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
