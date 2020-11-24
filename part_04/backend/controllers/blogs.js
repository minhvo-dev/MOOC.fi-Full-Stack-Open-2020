const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// GET: all the blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", {
      username: 1,
      name: 1,
      id: 1
    });
  response.json(blogs);
});

// POST: add a new blog
blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    // retrieve the id from the token
    if (!decodedToken.id) {
      return response
        .status(401)
        .send({
          error: "token missing or invalid"
        });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      ...body,
      user: user._id
    });

    const savedBlog = await blog.save();

    // update the user's blogs
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.json(savedBlog);
  }
  catch (exception) {
    next(exception);
  }
});

// DELETE: delete a blog
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response
        .status(401)
        .send({
          error: "token is missing or invalid"
        });
    }

    const userId = decodedToken.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).end();
    }
    if (blog.user.toString() !== userId.toString()) {
      return response
        .status(401)
        .send({
          error: "unauthorized deletion"
        });
    }

    const result = await Blog.findByIdAndRemove(id);
    if (result) {
      response.status(204).end();
    }
    else {
      response.status(404).end();
    }
  }
  catch (exception) {
    next(exception);
  }
});

// PUT: update an existing blog
// allow updating the entire data
blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;
    const id = request.params.id;

    const blog = await Blog.findById(id);
    if (!blog) {
      response.status(404).send({
        error: "id not found"
      });
    }
    else {
      const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: "query"
      });
      response.json(updatedBlog);
    }

  }
  catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;