const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("../tests/test_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

let token;

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    // creation of a new user to store in db
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();

    const response = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" });

    token = response.body.token;
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .set("Authorization", `bearer ${token}`)
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  }, 10000);

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .set("Authorization", `bearer ${token}`)
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  }, 10000);
});
