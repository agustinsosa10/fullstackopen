const express = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const tokenExtractor = require('../utils/tokenExtractor')

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user",{
    username: 1,
    name: 1
  });
  console.log(blogs);
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (blog) {
    response.json(blog);
    console.log(blog);
  } else {
    response.status(404).end();
  }
});

//primero entra al endpoint "/", luego vamos al middleware tokenExtractor (q extrae el token, datos del usuario etc) y despues ejecuta la funcion asincrona
blogsRouter.post("/", tokenExtractor, async (request, response) => {
  const {title, url, author, likes} = request.body;

  const { id: userId } = request.user

  const user = await User.findById(userId);

  if (!title || !url) {
    return response.status(400).json({ error: "title and url is required" });
  }

  const blog = new Blog({
    title,
    author: user.name,
    url,
    likes: likes ?? 0,
    user: user.id
  });

  const savedNote = await blog.save();
  user.blogs = user.blogs.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

blogsRouter.delete("/:id", tokenExtractor, async (request, response) => {
  const id = request.params.id;
  const blogToRemove = await Blog.findById(id);
  
  if(!blogToRemove) {
    return response.status(404).json({error: 'blog not found'})
  }
  
  const authenticateUser = request.user
  const userId = authenticateUser.id

  if(blogToRemove.user.toString() !== userId.toString()) {
    return response.status(401).json({
      error: 'no permission for delete the blog'
    })
  }

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = request.body;

  const newData = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, newData);
  response.json(updatedBlog);
});


module.exports = blogsRouter;
