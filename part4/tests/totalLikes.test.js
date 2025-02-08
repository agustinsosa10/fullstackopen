const { describe, test } = require("node:test");
const assert = require("node:assert");

const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  test("when the list has one blog, equals the likes of that", () => {
    const listWithOneBlog = [
      {
        title: "caca",
        likes: 5,
      },
    ];
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of empty list is zero", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  test("test should return the sum of likes of these blogs", () => {
    const blogs = [
      { title: "Blog 1", author: "Alice", likes: 3 },
      { title: "Blog 2", author: "Bob", likes: 7 },
      { title: "Blog 3", author: "Charlie", likes: 10 },
    ];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 20);
  });
});
