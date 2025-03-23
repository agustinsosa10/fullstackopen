const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require('./test_helper')

const api = supertest(app);


describe("pruebas para probar las peticiones", () => {

  beforeEach(async () => {
    await Blog.deleteMany({});
  
    let blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test("la lista de blogs debe devolver el formato correcto", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("debe devolver la cantidad correctas de notas", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("agregando una nota valida", async () => {
    const newBlog = {
      title: "nuevo blog",
      author: "agustin sosa",
      url: "test.url",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  });

  test("si falta la propiedad likes debe ser 0", async () => {
    const newBlog = {
      title: "nuevo blog",
      author: "agustin sosa",
      url: "test.url"
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    console.log(response.body)

    assert.strictEqual(response.body.likes ?? 0, 0)
  });

  test('no se puede agregar una nota si faltan propiedades', async () => {
    const newBlog = {
        author: "agustin sosa",
        likes: 10
      };
  
      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
});

describe("test para una nota en especifico", () => {
  test("verificacion que el identificador se llame id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => assert.ok(blog.id));
  });

  test("obteniendo una nota determinada", async ()=> {
    const blogAtStart = await helper.blogsInDb()
    const blogToView = blogAtStart[0]

    const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
  })

  test("eliminado una determinada nota", async() => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    const resultBlog = await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const notesAtEnd = await helper.blogsInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length - 1)

    const title = notesAtEnd.map( result => result.title)
    assert(!title.includes(blogToDelete.title))
  })
});

after(async () => {
  await mongoose.connection.close();
});
