const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog")

usersRouter.get("/", async (request, response) => {
  const users = await User
    .find({}).populate("blogs", {title: 1, author: 1, url: 1, likes: 1});
  console.log(users);
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, passwordHash, blogId } = request.body;
  const blog = await Blog.findById(blogId)

  if(!passwordHash) {
    return response.status(400).json({error: "password is required"})
  }

  const saltRounds = 10;
  const password = await bcrypt.hash(passwordHash, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash: password,
    blogs: blog._id
  });

  const savedUser = await user.save();
  blog.user = blog.user.concat(savedUser._id)
  await blog.save()

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
