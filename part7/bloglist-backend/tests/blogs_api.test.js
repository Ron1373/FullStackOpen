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

test("there are six blogs", async () => {
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
  const newUser = {
    name: "Test User",
    username: "testuser",
    password: "test123",
  };

  await api.post("/api/users").send(newUser).expect(201);
  const loginResponse = await api.post("/api/login").send(newUser).expect(200);

  const newPost = {
    title: "Full stack open is great!",
    author: "Max King",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/full-stack-open.html",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .set({ Authorization: `Bearer ${loginResponse.body.token}` })
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");
  const blogTitles = response.body.map((blog) => blog.title);
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);
  assert(blogTitles.includes("Full stack open is great!"));
});

test("when likes is missing from request, default to 0", async () => {
  const newUser = {
    name: "Test User",
    username: "testuser",
    password: "test123",
  };

  await api.post("/api/users").send(newUser).expect(201);
  const loginResponse = await api.post("/api/login").send(newUser).expect(200);

  const postMissingLikes = {
    title: "Node is great",
    author: "Hank",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/node-is-great.html",
  };
  await api
    .post("/api/blogs")
    .set({ Authorization: `Bearer ${loginResponse.body.token}` })
    .send(postMissingLikes);
  const response = await api.get("/api/blogs");
  const newPost = response.body.filter(
    (blog) =>
      blog.title === postMissingLikes.title &&
      blog.author === postMissingLikes.author
  );
  assert.strictEqual(newPost[0].likes, 0);
});

test("if title is missing, response is 404", async () => {
  const newUser = {
    name: "Test User",
    username: "testuser",
    password: "test123",
  };

  await api.post("/api/users").send(newUser).expect(201);
  const loginResponse = await api.post("/api/login").send(newUser).expect(200);

  const postMissingTitle = {
    author: "Hank",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/node-is-great.html",
    likes: 100,
  };
  await api
    .post("/api/blogs")
    .set({ Authorization: `Bearer ${loginResponse.body.token}` })
    .send(postMissingTitle)
    .expect(400);
});

test("if url is missing, response is 404", async () => {
  const newUser = {
    name: "Test User",
    username: "testuser",
    password: "test123",
  };

  await api.post("/api/users").send(newUser).expect(201);
  const loginResponse = await api.post("/api/login").send(newUser).expect(200);

  const postMissingTitle = {
    title: "React is better than Vue",
    author: "Hank",
    likes: 100,
  };
  await api
    .post("/api/blogs")
    .set({ Authorization: `Bearer ${loginResponse.body.token}` })
    .send(postMissingTitle)
    .expect(400);
});

test("when token is not provided, adding post fails with 401", async () => {
  const blogsAtStart = await api.get("/api/blogs");

  const post = {
    title: "Node is great",
    author: "Hank",
    likes: 20,
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/node-is-great.html",
  };

  // Attempt to create a blog without providing a token
  await api.post("/api/blogs").send(post);

  const blogsAtEnd = await api.get("/api/blogs");

  // Ensure the number of blogs hasn't changed
  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length);
});

test("delete post works", async () => {
  const newUser = {
    name: "Test User",
    username: "testuser",
    password: "test123",
  };

  await api.post("/api/users").send(newUser).expect(201);
  const loginResponse = await api.post("/api/login").send(newUser).expect(200);

  const newPost = {
    title: "Full stack open is great!",
    author: "Max King",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/full-stack-open.html",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .set({ Authorization: `Bearer ${loginResponse.body.token}` })
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await Blog.find({});
  const blogToDelete = blogs.filter((blog) => blog.title === newPost.title)[0];

  await api
    .delete(`/api/blogs/${blogToDelete._id.toString()}`)
    .set({ Authorization: `Bearer ${loginResponse.body.token}` })
    .expect(204);

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
