import React, { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Toggable from "./components/Togglable";

import config from "./configs/config";

import blogsService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [notification, setNotification] = useState(undefined);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const blogs = await blogsService.getAll();
        sortBlogsByLikesInDescendingOrder(blogs);
        setBlogs(blogs);
        const loggedUserJSON = window.localStorage.getItem(config.LOGGED_USER_CREDENTIALS_NAME);
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          setUser(user);
        }
      } catch (error) {
        console.log(error);
        displayNotification({
          message: error.response.data.message,
          style: "error"
        });
      }
    })();
  }, []);

  const addNewBlog = async (newBlog) => {
    try {
      const response = await blogsService.create(newBlog);
      displayNotification({
        message: `a new blog ${response.title} by ${response.author} added`,
        style: "success"
      });
      setBlogs(blogs.concat(response));
      blogFormRef.current.toggleVisibility();
    }
    catch (error) {
      console.log(error);
      displayNotification({
        message: error.response.data.message,
        style: "error"
      });
    }
  };

  const sortBlogsByLikesInDescendingOrder = (blogs) => {
    blogs.sort((b1, b2) => b2.likes - b1.likes);
  };

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogsService.likeBlog(blog);
      const updatedBlogs = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog);
      sortBlogsByLikesInDescendingOrder(updatedBlogs);
      setBlogs(updatedBlogs);
    }
    catch (error) {
      console.log(error.response.message.error);
    }
  };

  const removeBlog = async (removingBlog) => {
    try {
      await blogsService.remove(removingBlog);
      const updatedBlogs = blogs.filter(blog => blog.id !== removingBlog.id);
      sortBlogsByLikesInDescendingOrder(updatedBlogs);
      setBlogs(updatedBlogs);
    }
    catch (error) {
      console.log(error.response.message.error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem(
        config.LOGGED_USER_CREDENTIALS_NAME,
        JSON.stringify(user)
      );

      setUser(user);
      setUsername("");
      setPassword("");

      displayNotification({
        message: `${user.name} logged in`,
        style: "success"
      });
    }
    catch (error) {
      console.log(error);
      displayNotification({
        message: error.response.data.error,
        style: "error"
      });
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(config.LOGGED_USER_CREDENTIALS_NAME);
    setUser(null);
    displayNotification({
      message: `${user.name} logged out`,
      style: "success"
    });
  };

  const displayNotification = (notification) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(undefined);
    }, config.NOTIFICATION_TIMEOUT);
  };

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          username={username}
          password={password}
          usernameOnChange={({ target }) => { setUsername(target.value); }}
          passwordOnChange={({ target }) => { setPassword(target.value); }}
          onSubmit={handleLogin}
          displayNotification={displayNotification} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Notification notification={notification} />
        <h2>Blogs</h2>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Toggable
        buttonLabel="new blog"
        ref={blogFormRef}
      >
        <NewBlogForm
          handleNewBlog={addNewBlog}
          displayNotification={displayNotification}
        />
      </Toggable>
      <div>
        {blogs.map(blog => <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
        />)}
      </div>

    </div>
  );
};

export default App;