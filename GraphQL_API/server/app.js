// Import necessary modules using CommonJS syntax
const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const schema = require('./schema/schema');

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

const app = express();
// allow cross-origin requests from server to client (localhost:3000)
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  // task 2 addition
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
