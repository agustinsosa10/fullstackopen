const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("cuando hay un usuario cargado en la base de datos", () => {
  beforeEach(async () => {
    //se borran todos los usuarios q haya en la bd
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);

    //se  carga el siguiente usuario para pruebas
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creando un usuario con un nuevo username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "chelo",
      name: "agustin chelo",
      password: "1234",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });

  test("no se puede crear un usuario con un username existente", async () => {
    //obtenemos los usuarios de la bd
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: "rooteando",
      password: "23343",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});
