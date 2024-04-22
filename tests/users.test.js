const request = require("supertest");

const server = require("./../src/server");
const dbHelper = require("../src/utilities/initialize-tables");

beforeAll(() => {
  dbHelper.initialize();
});

describe("Users API", () => {
  describe("Successful registration", () => {
    it("POST /register", async () => {
      return await request(server)
        .post("/api/users/register")
        .send({ username: "testuser123", password: "mypass" })
        .expect(200);
    });
  });
});
