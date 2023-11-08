const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// The Mongoose join is done with the populate method.
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response.status(401).json({
      error: "must add username and password",
    });
  } else if (username.length < 3 || password.length < 3) {
    return response.status(401).json({
      error: "length must be more than 3 chars",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error); // This will pass the error to the errorHandler middleware
  }
});

module.exports = usersRouter;
