const express = require('express'),
resolvers = require('./resolvers'),
typeDefs = require('./typeDefs'),
axios = require('axios'),
{ ApolloServer } = require('apollo-server-express');

const app = express();

app.use(express.static('public'))

const PORT = 3001;



//apolloServer.applyMiddleware({app, path: '/challenge'});

  app.get('/oauth/callback', (req, res) => {
    const requestToken = req.query.code
    const clientID = '872ca578affba5d8f86e';
    const clientSecret = 'f9386d42c7ddb9c77a168c510ee2fd8654005571';
    axios({
      method: 'POST',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json'
      }
    }).then(({data}) => {
      // extract the token from the response
      const accessToken = data.access_token

      // Do not start and apply the apollo server until after authentication
      const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
      });
      apolloServer.applyMiddleware({app, path: '/challenge'});

      res.redirect(`/callback.html?access_token=${accessToken}`)
    })
  })

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});



