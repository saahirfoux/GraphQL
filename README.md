# Coding Challenge: GraphQL

## Goal 

Create a simple GraphQL API

## Tasks

Create the following queries:
o Get User
o Get Post
o Get Comment
o Get Comments From Post

Create the following mutations:
o Update Post
o Delete Post

Implement authentication using Github single sign on

## Start Up Instructions

<pre>git clone https://github.com/saahirfoux/GraphQL.git</pre>

After you have cloned the repository run the following commands:

<pre>npm install</br>
npm run dev</pre>

Runs the server in the development mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser. The server will automatically redirect you to the GraphIQL at '/challenge'
<br />
You will also see any lint errors in the console.

<br />

You can use the following queries and mutations to test the API.

<br />

<pre>

query GetAllUsers{
  users {
    id
    username
    email
    phone
    website
    address {
      street
      suite
      city
      zipcode
    }
    posts {
      title
    }
  }
}

query GetUserByID {
  user(id: 2) {
    name
  }
}

query GetPostsByUser{
  postsByUser(id: 1) {
    id
    title
		userId
		body
  }
}

query GetPostByID {
  postById(id: 1) {
    title
    body
    id
    userId
  }
}

query GetCommentsByPost {
  commentsByPost(id: 1) {
    id
    postId
    name
    email
    body
  }
}

query GetCommentsByIDs {
  commentByIds(pid:1 cid: 2) {
    name
    email
    id
		body
    postId
  }
}

mutation updatePostById {
  updatePost(input: { 
  	id: 1,
    body: "a"
    title:"Title"
  }) {
    id
    title
    body
  }
}

mutation deletePostById {
  deletePost(id: 1) {
    id
  }
}


</pre>
