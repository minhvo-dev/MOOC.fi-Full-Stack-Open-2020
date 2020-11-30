import axios from "axios";
import config from "../configs/config";

const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem(config.LOGGED_USER_CREDENTIALS_NAME));
  return `bearer ${user.token}`;
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const likeBlog = async (blog) => {
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog);
  return response.data;
};

const remove = async (blog) => {
  const config = {
    headers: {
      Authorization: getToken()
    }
  };

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

export default {
  getAll,
  create,
  likeBlog,
  remove
};