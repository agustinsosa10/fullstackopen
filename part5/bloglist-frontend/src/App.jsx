import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import login from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formVisible, setFormVisible] = useState(true)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      console.log(user.token);
      setUser(user);
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");

      setNotification({ message: "Login successful", type: "success" });
      setTimeout(() => setNotification(null), 5000);
    } catch (e) {
      console.log(e);
      setNotification({ message: "Wrong username or password", type: "error" });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleUsernameChange = (event) => {
    const { target } = event;
    setUsername(target.value);
  };

  const handlePasswordChange = (event) => {
    const { target } = event;
    setPassword(target.value);
  };

  const handleTitleChange = (event) => {
    const { target } = event;
    setTitle(target.value);
  };

  const handleUrlChange = (event) => {
    const { target } = event;
    setUrl(target.value);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();

    const { name } = user;

    const blogObject = {
      title,
      author,
      url,
    };

    try {
      console.log(user.token);
      const blog = await blogService.create(blogObject);
      setBlogs((prevBlogs) => prevBlogs.concat(blog));
      setTitle("");
      setAuthor("");
      setUrl("");

      setNotification({
        message: `A new blog "${blog.title}" added!`,
        type: "success",
      });
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      console.error("Error creating blog:", error);
      setNotification({ message: "Error creating blog", type: "error" });
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <>
      <Notification message={notification?.message} type={notification?.type} />
      {user === null ? (
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          onChangeUsername={handleUsernameChange}
          password={password}
          onChangePassword={handlePasswordChange}
        />
      ) : (
        <div>
          <BlogForm
            formVisible={formVisible}
            setFormVisible={setFormVisible}
            onClick={handleLogout}
            name={user.name}
            onSubmit={handleAddBlog}
            title={title}
            onChangeTitle={handleTitleChange}
            url={url}
            onChangeUrl={handleUrlChange}
          />
          <h3>list of blogs</h3>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
