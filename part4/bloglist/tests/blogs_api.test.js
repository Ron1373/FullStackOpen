const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");
const helper = require("../utils/helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are five blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, 6);
});

test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  assert(blogs[0].id !== undefined);
  assert.strictEqual(blogs[0]._id, undefined);
});

test("creating a new blog post works", async () => {
  const newPost = {
    title: "Full stack open is great!",
    author: "Max King",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/full-stack-open.html",
    likes: 10,
  };
  await api
    .post("/api/blogs")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const blogTitles = response.body.map((blog) => blog.title);
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
  assert(blogTitles.includes("Full stack open is great!"));
});

test("when likes is missing from request, default to 0", async () => {
  const postMissingLikes = {
    title: "Node is great",
    author: "Hank",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/node-is-great.html",
  };
  await api.post("/api/blogs").send(postMissingLikes);
  const response = await api.get("/api/blogs");
  const newPost = response.body.filter(
    (blog) =>
      blog.title === postMissingLikes.title &&
      blog.author === postMissingLikes.author
  );
  assert.strictEqual(newPost[0].likes, 0);
});

test("if title is missing, response is 404", async () => {
  const postMissingTitle = {
    author: "Hank",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/node-is-great.html",
    likes: 100,
  };
  await api.post("/api/blogs").send(postMissingTitle).expect(400);
});

test("if url is missing, response is 404", async () => {
  const postMissingTitle = {
    title: "React is better than Vue",
    author: "Hank",
    likes: 100,
  };
  await api.post("/api/blogs").send(postMissingTitle).expect(400);
});

test("delete post works", async () => {
  const blogs = await Blog.find({});
  const blogToDelete = blogs[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const newBlogs = await Blog.find({});
  const newBlogsTitles = newBlogs.map((blog) => blog.title);
  assert.strictEqual(newBlogs.length, blogs.length - 1);
  assert(!newBlogsTitles.includes(blogToDelete.title));
});

test("updating number of likes on post works", async () => {
  const blogs = await Blog.find({});
  const blogToUpdate = blogs[0];
  const initialLikes = blogToUpdate.likes;
  const updatedLikes = initialLikes + 100;

  const updatedBlogData = { likes: updatedLikes };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlogData)
    .expect(200);

  assert.strictEqual(initialLikes + 100, response.body.likes);
});

after(async () => {
  await mongoose.connection.close();
});
