import blogsService from "../services/blogs";

const sortBlogsByLikesInDescendingOrder = (blogs) => {
  blogs.sort((b1, b2) => b2.likes - b1.likes);
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      const blogs = action.data;
      sortBlogsByLikesInDescendingOrder(blogs);
      return blogs;
    case "NEW_BLOG":
      return [...state, action.data];
    case "UPDATE_BLOG":
      const blog = action.data;
      const updatedBlogs = state.map(b =>
        b.id !== blog.id
          ? b
          : blog
      );
      sortBlogsByLikesInDescendingOrder(updatedBlogs);
      return updatedBlogs;
    case "REMOVE_BLOG": 
      const removedBlog = action.data;
      return state.filter(blog => blog.id !== removedBlog.id);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogsService.create(blog);
    dispatch({
      type: "NEW_BLOG",
      data: response
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogsService.likeBlog(blog);
    dispatch({
      type: "UPDATE_BLOG",
      data: response
    });
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.remove(blog);
    dispatch({
      type: "REMOVE_BLOG",
      data: blog
    });
  };
};

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const response = await blogsService.addComment(blog, comment);
    dispatch({
      type: "UPDATE_BLOG",
      data: response
    });
  };
};

export default reducer;