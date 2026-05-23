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

export default { testUser, createTestUser, resetDB, loginWith };
