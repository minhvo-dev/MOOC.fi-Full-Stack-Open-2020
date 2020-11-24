const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helpers");

const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const user = await api
    .post("/api/users")
    .send({
      username: "root",
      name: "Admin",
      password: "password"
    });

  for (let blog of helper.initialBlogs) {
    const blogObject = new Blog({
      ...blog,
      user: user.body.id
    });
    await blogObject.save();
  }
});

describe("testing initial blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map(blog => blog.title);
    expect(contents).toContain(helper.initialBlogs[1].title);
  });

  test("unique identifier property is id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("adding a new blog", () => {
  test("a valid blog can be added with valid token", async () => {
    const login = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "password"
      });
    const token = login.body.token;

    const newBlog = {
      title: "New Blog Title",
      author: "New Blog Author",
      url: "https://newblogurl.net",
      likes: 12
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogs.map(blog => blog.title);
    expect(titles).toContain(newBlog.title);

    const users = await api.get("/api/users");
    expect(blogs[blogs.length - 1].user.toString()).toContain(users.body[0].id.toString());
  });

  test("likes property is 0 by default", async () => {
    const login = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "password"
      });
    const token = login.body.token;

    const newBlog = {
      title: "New Blog Title",
      author: "New Blog Author",
      url: "https://newblogurl.net"
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);

    const likes = blogs.map(blog => blog.likes);
    expect(likes[helper.initialBlogs.length]).toEqual(0);
  });

  test("missing title and url properties cannot be added", async () => {
    const login = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "password"
      });
    const token = login.body.token;

    const newBlog = {
      author: "missing-author",
      like: 123
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deleting a blog", () => {
  test("succeeds with a valid id and token", async () => {
    const blogs = await helper.blogsInDb();
    const login = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "password"
      });
    const token = login.body.token;

    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const result = await helper.blogsInDb();
    expect(result).toHaveLength(blogs.length - 1);

    const titles = result.map(blog => blog.title);
    expect(titles).not.toContain(blogs[0].title);
  });

  test("fails with a non-valid id and valid token", async () => {
    const nonExistingId = await helper.nonExistingId();
    const login = await api
      .post("/api/login")
      .send({
        username: "root",
        password: "password"
      });
    const token = login.body.token;

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set("Authorization", `bearer ${token}`)
      .expect(404);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });

  test("fails with a valid id and invalid token", async () => {
    const blogs = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${blogs[0].id}`)
      .set("Authorization", "bearer invalidtoken")
      .expect(401);

    const result = await helper.blogsInDb();
    expect(result).toHaveLength(blogs.length);
  });

});

describe("updating a blog", () => {
  test("succeeds with a valid id and info", async () => {
    const blogs = await helper.blogsInDb();
    const newInfo = {
      title: "New title",
      author: "New author",
      url: "New url",
      likes: 0
    };

    const response = await api
      .put(`/api/blogs/${blogs[0].id}`)
      .send(newInfo);
    expect(response.body.id).toEqual(blogs[0].id);
    for (let prop in newInfo) {
      expect(response.body[prop]).toEqual(newInfo[prop]);
    }
  });

  test("fails with a valid non-existing id", async () => {
    const invalidId = await helper.nonExistingId();
    const newInfo = {
      title: "New title",
      author: "New author",
      url: "New url",
      likes: 0
    };

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(newInfo)
      .expect(404);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });

});

afterAll(() => {
  mongoose.connection.close();
});