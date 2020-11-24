const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helpers");
const bcrypt = require("bcrypt");

const api = supertest(app);

const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("secret", 5);
  const user = new User({
    username: "root",
    name: "Admin",
    passwordHash
  });
  await user.save();
});

describe("adding a new user", () => {

  test("with a legit information", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "newuser",
      name: "New User",
      password: "password"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("with existing username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "New User",
      password: "strongpassword"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("with missing username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "New User",
      password: "strongpassword"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("with password length of 2", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "newuser",
      name: "New User",
      password: "pw"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("log-in", () => {
  test("with valid info", async () => {
    const loginInfo = {
      username: "root",
      password: "secret"
    };

    const result = await api
      .post("/api/login")
      .send(loginInfo)
      .expect(200);
    expect(result.body.token).toBeDefined();
  });

  test("with invalid info", async () => {
    const loginInfo = {
      username: "root",
      password: "wrongpassword"
    };

    await api
      .post("/api/login")
      .send(loginInfo)
      .expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});