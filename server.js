const express = require('express'),
cors = require('cors'),
fetch = require('node-fetch'),
{ ApolloServer, gql } = require('apollo-server-express');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

const typeDefs = gql`
    type Query {
        users: [User!]
        posts: [Post!]
        user(id: ID!): User
        postsByUser(id: ID!): [Post]
        postById(id: ID!): Post
        commentsByPost(id: ID!): [Comment]
        commentByIds(pid: ID! cid: ID!): Comment
    }
    type User {
        id: Int!
        name: String!
        username: String
        email: String
        phone: String
        website: String
        address: UserAddress
        posts: [Post]
    }
    type UserAddress {
        street: String
        suite: String
        city: String
        zipcode: String
    }
    type Post {
        id: Int
        user: User
        userId: Int
        title: String
        body: String
        comments: [Comment]
    }
    type Comment {
        id: Int
        post: Post
        postId: Int
        name: String
        email: String
        body: String
    }
    type Mutation {
        updatePost(input: UpdatePostInput!): Post
        deletePost(id: ID!): Post
    }
    input UpdatePostInput {
        id: ID!
        body: String
        title: String
    }
`;
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
const resolvers = {
    Query: {
        users: async () => {
            return await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {return users});
        },
        posts: async () => {
            return await fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {return posts});
        },
        user: async (_, {id}) => {
            return await fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then(users => {
                 return users.find(user => user.id.toString() === id)
            });
        },
        postsByUser: async (_, {id}) => {
            return await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + id)
                .then(response => response.json())
                .then(posts => posts );
        },
        postById: async (_, {id}) => {
            return await fetch('https://jsonplaceholder.typicode.com/posts/' + id)
                .then(response => response.json())
                .then(posts => {
                 return posts
            });
        },
        commentsByPost: async (_, {id}) => {
            return await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + id)
                .then(response => response.json())
                .then(comments => comments );
        },
        commentByIds: async (_, {pid, cid}) => {
            return await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + pid)
                .then(response => response.json())
                .then(comments => {
                 return comments.find(comment => comment.id.toString() === cid)
            });
        }
    },
    User: {
        posts: async ({id}) => {
            return await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + id)
                .then(response => response.json())
                .then(posts => {return posts});
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
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

apolloServer.applyMiddleware({app, path: '/challenge'});


app.use('/', (req, res, next) => {
    res.send({ message: 'My incredible first message'});
});


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    console.log(`GraphQL endpoint is: ${apolloServer.graphqlPath}`);
});



