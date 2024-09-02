const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, testTitle, testAuthor, testUrl) => {
  await page.getByTestId("title").fill(testTitle);
  await page.getByTestId("author").fill(testAuthor);
  await page.getByTestId("url").fill(testUrl);

  await page.getByRole("button", { name: "Create" }).click();
};

module.exports = { loginWith, createBlog };
