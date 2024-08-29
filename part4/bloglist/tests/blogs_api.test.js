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

after(async () => {
  await mongoose.connection.close();
});
