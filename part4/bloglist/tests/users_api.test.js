const User = require("../models/users");
const helper = require("../utils/helper");
const bcrypt = require("bcrypt");
const { describe, test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({
      username: "Ron",
      passwordHash,
      name: "Ron Shrestha",
    });

    await user.save();
  });

  test("creation succeeds with fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "George Wabash",
      username: "george",
      password: "georgism",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length);

    const usernames = usersAtEnd.map((user) => user.username);

    assert(usernames.includes("george"));
  });

  test("creation fails with proper statuscode if username already taken", () =>
    async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "Ron",
        password: "ronaldo",
        name: "Ron Shrestha",
      };

      const result = await api.post("/api/users").send(newUser).expect(400);
      assert(result.body.error.includes("expected username to be unique"));
      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtStart.length, usersAtEnd.length);
    });

  test("creation fails with proper statuscode if password is less than 3 characters", () =>
    async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "Ron",
        password: "r",
        name: "Ron Shrestha",
      };

      const result = await api.post("/api/users").send(newUser).expect(400);
      assert(
        result.body.error.includes(
          "Password must be at least 3 characters long."
        )
      );
      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtStart.length, usersAtEnd.length);
    });

  after(async () => {
    await mongoose.connection.close();
  });
});
