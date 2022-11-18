import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers.js';

let db = 'mongodb://localhost:27017/recipe';

// ApolloServer
// typeDefs  : GraphQL Type Definitions
// resolvers : How do we resolve queries / mutations

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
