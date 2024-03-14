const dotenv = require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

const app = express();

app.use('/graphql',graphqlHTTP({
  schema,
  // task 2 addition
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
