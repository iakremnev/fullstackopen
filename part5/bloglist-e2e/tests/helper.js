const testUser = {
    username: "tango35",
    name: "Lago Shwartz",
    password: "silly!Pwd124",
};

const createTestUser = async (request) => {
    await request.post("/api/users", {data: testUser});
};

const resetDB = async (request) => {
    await request.post("/api/testing/reset");
};

const loginWith = async (page, username, password) => {
  await page.getByLabel('username:').fill(username)
  await page.getByLabel('password:').fill(password)
  await page.getByText('Sign In').click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByText('Add new blog').click()
  await page.getByLabel('title:').fill(title)
  await page.getByLabel('author:').fill(author)
  await page.getByLabel('url:').fill(url)
  await page.getByText('Create').click()
}

export default { testUser, createTestUser, resetDB, loginWith, createBlog };
