const fetch = require('node-fetch'),
ajax = require('../lib/api');

const verifyInput = ({body, title}) => {
    // if body or title exists, and it is an empty string, throw an error
    let payload = {};

    if (typeof body !== undefined && body.length === 0) {
        throw new Error("Please enter desired text to update the contents of your post");
    } else {
        payload.body = body;
    }
    if (typeof title !== undefined && title.length === 0) {
        throw new Error("Every post must have a title. Please enter it now");
    } else if (typeof title !== undefined && title.length < 3) {
        throw new Error("Minimum allowed length is 3 characters.");
    } else {
        payload.title = title;
    }
    return payload;
  };

module.exports = {
    Query: {
        posts: async () => {
            return await ajax('https://jsonplaceholder.typicode.com/posts')
            .then(posts => {return posts});
        },
        postsByUser: async (_, {id}) => {
            return await ajax('https://jsonplaceholder.typicode.com/posts?userId=' + id)
                .then(posts => posts );
        },
        postById: async (_, {id}) => {
            return await ajax('https://jsonplaceholder.typicode.com/posts/' + id)
                .then(posts => posts);
        },
        commentsByPost: async (_, {id}) => {
            return await ajax('https://jsonplaceholder.typicode.com/comments?postId=' + id)
                .then(comments => comments);
        },
        commentByIds: async (_, {pid, cid}) => {
            return await ajax('https://jsonplaceholder.typicode.com/comments?postId=' + pid)
                .then(comments => { return comments.find(comment => comment.id.toString() === cid)});
        }
    },
    Mutation: {
        updatePost: async (_, {input}) => {
            const payload = verifyInput(input);

            return await fetch('https://jsonplaceholder.typicode.com/posts/' + input.id,
            {
                method: 'PATCH',
                body: JSON.stringify(payload),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
            .then(json => json);
        },

        deletePost: async (_, {id}) => {
            return await fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
                method: 'DELETE'
            });
        }
    }
}

