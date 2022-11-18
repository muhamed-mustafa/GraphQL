import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers/index.js';

let db = 'mongodb://localhost:27017/User';

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MonoDB Connection Successfully');
    return server.listen({ port: 3000 });
  })
  .then((res) => {
    console.log(`Server Running At ${res.url}`);
  });
