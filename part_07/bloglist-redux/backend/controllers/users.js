const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// GET: get all the users
usersRouter.get("/", async (request, response) => {
  const users = await User
    .find({})
    .populate("blogs", {
      url: 1,
      title: 1,
      author: 1,
      id: 1
    });
  response.json(users);
});

// POST: add a new user
usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (!body.password || body.password.length < 3) {
      const error = new Error("password must be at least 3-character long");
      error.name = "ValidationError";
      throw error;
    }

    const saltRounds = 5;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
  }
  catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;