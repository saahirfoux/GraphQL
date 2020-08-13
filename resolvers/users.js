const ajax = require('../lib/api');

module.exports = {
    Query: {
        users: async () => {
            return await ajax('https://jsonplaceholder.typicode.com/users')
                .then(users => {return users});
        },
        user: async (_, {id}) => {
            return await ajax('https://jsonplaceholder.typicode.com/users')
                .then(users => { return users.find(user => user.id.toString() === id)});
        }
    },
    User: {
        posts: async ({id}) => {
            return await ajax('https://jsonplaceholder.typicode.com/posts?userId=' + id)
                .then(posts => {return posts});
        }
    }
}