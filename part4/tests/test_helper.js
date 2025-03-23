const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "aprendiendo node",
    author: "chelo",
    url: "sad.com",
    likes: 10,
  },
  {
    title: "fullstackopen",
    author: "agustin",
    url: "fullstack.com",
    likes: 12,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

//verifica si se agrego el blog a la bd despues de crearlo
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

//verifica si se agrego el usuario a la bd dsp de crearlo
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
