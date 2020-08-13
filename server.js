const express = require('express'),
cors = require('cors'),
resolvers = require('./resolvers'),
typeDefs = require('./typeDefs'),
{ ApolloServer } = require('apollo-server-express');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
})

apolloServer.applyMiddleware({app, path: '/challenge'});


app.use('/', (req, res) => {
    res.redirect('/challenge');
});


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
    console.log(`GraphQL endpoint is: ${apolloServer.graphqlPath}`);
});



