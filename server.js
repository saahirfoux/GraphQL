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
    }
    type User {
        id: Int!
        name: String!
        username: String
        email: String
        phone: String
        website: String
        address: UserAddress
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
        title: String
        body: String
        comments: [Comment]
    }
    type Comment {
        id: Int
        post: Post
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
            .then(data => {return data});
        },
        posts: async () => {
            return await fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {return data});
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



