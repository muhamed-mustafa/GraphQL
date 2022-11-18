import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    username: String
    email: String
    password: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input UpdateInput {
    username: String
    email: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    user(ID: ID!): User
  }

  type Mutation {
    registerUser(registerUser: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    updateUser(ID: ID!, updateInput: UpdateInput): Boolean
    deleteUser(ID: ID!): Boolean
  }
`;

export { typeDefs };
