const request = require("supertest");

const server = require("./../src/server");
const dbHelper = require("../src/utilities/initialize-tables");

beforeAll(async () => {
  await dbHelper.initialize();
  await dbHelper.resetIds();
  await dbHelper.setValuesUsers();
  await dbHelper.setValuesTokens();
  await dbHelper.setValuesCountries();
});

// describe("Users API", () => {
//   describe("Successful registration", () => {
//     it("POST /register", async () => {
//       const response = await request(server)
//         .post("/api/users/register")
//         .send({ username: "testuser123", password: "mypass" });

//       expect(response.status).toBe(200);
//     });
//   });
// });

// describe("Users API", () => {
//   describe("Duplicate user", () => {
//     it("POST /register", async () => {
//       const response = await request(server)
//         .post("/api/users/register")
//         .send({ username: "user2", password: "mypass" });
//       // console.log("err: ", response);
//       expect(response.status).toBe(500);
//     });
//   });
// });

// describe("Users API", () => {
//   describe("Less than 3 characters", () => {
//     it("POST /register", async () => {
//       const response = await request(server)
//         .post("/api/users/register")
//         .send({ username: "use", password: "mypass" });
//       console.log("err: ", response.text);
//       expect(response.status).toBe(400);
//     });
//   });
// });

// describe("Users API", () => {
//   describe("More than 32 characters", () => {
//     it("POST /register", async () => {
//       const response = await request(server)
//         .post("/api/users/register")
//         .send({ username: "asfadfafafafsafafasfafafsafsfafassfsfassssssssssssssfasaf", password: "mypass" });
//       console.log("err: ", response.text);
//       expect(response.status).toBe(400);
//     });
//   });
// });

// describe("Users API", () => {
//   describe("Empty Username", () => {
//     it("POST /register", async () => {
//       const response = await request(server)
//         .post("/api/users/register")
//         .send({ username: "", password: "mypass" });
//       console.log("err: ", response.text);
//       expect(response.status).toBe(400);
//     });
//   });
// });

// describe("Users API", () => {
//   describe("No special characters", () => {
//     it("POST /register", async () => {
//       const response = await request(server)
//         .post("/api/users/register")
//         .send({ username: "asd_^", password: "mypass" });
//       console.log("err: ", response.text);
//       expect(response.status).toBe(400);
//     });
//   });
// });

describe("Users API", () => {
  describe("Login successful", () => {
    it("POST /login", async () => {
      const response = await request(server)
        .post("/api/users/login")
        .send({ username: "user3", password: "hayss" });
      console.log("err: ", response.text);
      resObj = JSON.parse(response.text);

      expect(response.status).toBe(200);
      expect(resObj.token).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJ1c2VySUQiOjMsInVzZXJuYW1lIjoidXNlcjMiLCJ0b2tlbiI6ImhlaGV5IiwidG9rZW5JRCI6MywiY291bnRyeSI6NX19.O779GP274LkqzsgUahF0hW3YI_sMd4IwAgsP-evCwU8');
    });
  });
});

// describe("Games API", () => {
//   describe("Successful country creation", () => {
//     it("POST /country/create", async () => {
//       const response = await request(server)
//         .post("/api/game/country/create")
//         .set('x-access-token', JSON.stringify({userId: 1, token: 'hayss', tokenId: 1}))
//         .send({ name: "my country" });
//       console.log('responsse: ', response.error);
//       expect(response.status).toBe(200);
//     });
//   });
// });

// describe("Games API", () => {
//   describe("User already has a country", () => {
//     it("POST /country/create", async () => {
//       const response = await request(server)
//         .post("/api/game/country/create")
//         .set('x-access-token', JSON.stringify({userId: 3, token: 'hayss', tokenId: 2}))
//         .send({ name: "my country" });
//       console.log('responsse: ', response.error);
//       expect(response.status).toBe(400);
//     });
//   });
// });

// describe("Games API", () => {
//   describe("Succesful build buildings", () => {
//     it("POST /country/build", async () => {
//       // farmAmt, businessAmt, reasearchLabAmt
//       const response = await request(server)
//         .post("/api/game/country/build")
//         .set('x-access-token', JSON.stringify({userId: 3, token: 'hayss', tokenId: 2}))
//         .send({amtsStr: JSON.stringify({ farm: 5, business: 0, reasearchLab: 0 })});
//       console.log('responsse: ', response.text);
//       expect(response.status).toBe(200);
//     });
//   });
// });


// describe("Games API", () => {
//   describe("Succesful build buildings", () => {
//     it("POST /country/build", async () => {
//       // farmAmt, businessAmt, reasearchLabAmt
//       const response = await request(server)
//         .post("/api/game/country/build")
//         .set('x-access-token', JSON.stringify({userId: 3, token: 'hayss', tokenId: 2}))
//         .send({amtsStr: 'hey'});
//       console.log('responsse: ', response.error);
//       expect(response.status).toBe(400);
//     });
//   });
// });


