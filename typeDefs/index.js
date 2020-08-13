const { gql } = require('apollo-server-express');

module.exports = gql`
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