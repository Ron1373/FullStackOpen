const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

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
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== decodedToken.id) {
      return response
        .status(403)
        .json({ error: "not authorized to delete this blog" });
    }

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
