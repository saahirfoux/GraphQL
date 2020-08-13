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
`;

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



