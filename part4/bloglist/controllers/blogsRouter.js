const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const user = await User.findById(request.body.userId);
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: user.id,
    });

    const result = await blog.save();

    user.blogs = user.blogs.concat(result.id);
    await user.save();

    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  const newPost = request.body;
  try {
    const updatedPost = await Blog.findByIdAndUpdate(id, newPost, {
      new: true,
      runValidators: true,
    });
    response.json(updatedPost);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
