const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const { title, author, likes } = blogs.sort((a, b) => b.likes - a.likes)[0];
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, "author");
  const mostBlogsAuthor = _.maxBy(_.entries(authorCounts), _.last);
  return mostBlogsAuthor
    ? { author: mostBlogsAuthor[0], blogs: mostBlogsAuthor[1] }
    : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
