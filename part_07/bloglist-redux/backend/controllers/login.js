const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

// POST: login request
loginRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    const user = await User.findOne({
      username: body.username
    });
    const isPasswordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && isPasswordCorrect)) {
      return response
        .status(401)
        .send({
          error: "invalid username or password"
        });
    }

    const userForToken = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
      .status(200)
      .send({
        token,
        username: user.username,
        name: user.name
      });
  }
  catch (exception) {
    next(exception);
  }
});

module.exports = loginRouter;