const request = require("supertest");

const server = require("./../src/server");
const dbHelper = require("../src/utilities/initialize-tables");

beforeAll(() => {
  dbHelper.initialize();
});

describe("Users API", () => {
  describe("Successful registration", () => {
    it("POST /register", async () => {
      const response = await request(server)
        .post("/api/users/register")
        .send({ username: "testuser123", password: "mypass" });

      expect(response.status).toBe(200);
    });
  });
});

describe("Games API", () => {
  describe("Successful country creation", () => {
    it("POST /country/create", async () => {
      const response = await request(server)
        .post("/api/game/country/create")
        .send({ userId: 1, name: "my country" });

      expect(response.status).toBe(200);
    });
  });
});
