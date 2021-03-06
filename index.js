/*const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
//const gql = require('graphql-tag');
const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
//const Post = require('./models/Post.js');


//const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});
mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })*/

  const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config.js');

const pubsub = new PubSub();

const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })

  