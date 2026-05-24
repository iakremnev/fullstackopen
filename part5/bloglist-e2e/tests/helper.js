const testUser = {
    username: "tango35",
    name: "Lago Shwartz",
    password: "silly!Pwd124",
};

const anonymousBlogs = [
    {
        title: "Lol I found stuff",
        author: "Aristotle",
        url: "https://somewhereingreece.com",
        likes: 13,
    },
    {
        title: "Hooly Molly",
        author: "Lucid K",
        url: "https://irrationalblogs.com/1245",
        likes: 2,
    },
    {
        title: "Killing time writing test data",
        author: "Smart Guy",
        url: "https://nevereverblog.com/32421-fake",
        likes: 20,
    },
];

const createTestUser = async (request) => {
    await request.post("/api/users", { data: testUser });
};

const resetDB = async (request) => {
    await request.post("/api/testing/reset");
};

const createAnonymousBlog = async (request, blog) => {
    await request.post("api/testing/anonymousblog", { data: blog });
};

const loginWith = async (page, username, password) => {
    await page.getByLabel("username:").fill(username);
    await page.getByLabel("password:").fill(password);
    await page.getByText("Sign In").click();
};

const createBlog = async (page, title, author, url) => {
    await page.getByLabel("title:").fill(title);
    await page.getByLabel("author:").fill(author);
    await page.getByLabel("url:").fill(url);
    await page.getByText("Create", {exact: true}).click();
};

export default {
    testUser,
    anonymousBlogs,
    createTestUser,
    resetDB,
    createAnonymousBlog,
    loginWith,
    createBlog,
};
