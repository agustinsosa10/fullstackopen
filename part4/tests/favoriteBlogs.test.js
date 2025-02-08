const { describe, test } = require("node:test");
const assert = require("node:assert");
const listHelper = require('../utils/list_helper')

describe('blogs with more likes', ()=> {
    
    test('which is the blog with the most likes', () => {
        const blogs = [
            { title: "Blog 1", author: "Alice", likes: 3 },
            { title: "Blog 2", author: "Bob", likes: 7 },
            { title: "Blog 3", author: "Charlie", likes: 10 },
          ];

        const result = listHelper.favoriteBlog(blogs)

        assert.deepStrictEqual(result, { title: "Blog 3", author: "Charlie", likes: 10 })
    })

    test('when the array in empty returns null', () => {
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)

        assert.deepStrictEqual(result, null)
    })
})