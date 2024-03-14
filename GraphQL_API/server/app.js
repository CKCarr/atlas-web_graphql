import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import schema from './schema/schema.js';
dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  // task 2 addition
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
