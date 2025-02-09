const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

router.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
    console.log(blogs);
  });
});

router.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = router;
