import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphqlSchema } from './graphql/schema/index.js';
import { graphqlResolvers } from './graphql/resolvers/index.js';
import { dbConnection } from './config/database.js';
import { isAuth } from './middlewares/is-auth.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

dbConnection();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App Running On Port ${PORT}`));
