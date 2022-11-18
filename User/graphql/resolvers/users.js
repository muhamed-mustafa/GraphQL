import { User } from '../../models/User.js';
import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcryptjs';
import { createToken } from '../../utils/create-token.js';

const userResolvers = {
  Query: {
    async user(_, { ID }) {
      return await User.findById(ID);
    },
  },

  Mutation: {
    async registerUser(_, { registerUser: { username, email, password } }) {
      let user = await User.findOne({ email });
      if (user) {
        throw new ApolloError(`${email} is already registered`);
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      user = new User({ email, username, password: hashedPassword });

      const token = createToken(user._id);
      user.token = token;
      const result = await user.save();

      return {
        id: result._id,
        ...result._doc,
      };
    },

    async loginUser(_, { loginInput: { email, password } }) {
      let user = await User.findOne({ email });

      if (user && bcrypt.compare(password, user.password)) {
        const token = createToken(user._id);
        user.token = token;

        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError(`Invalid email or password`);
      }
    },

    async updateUser(_, { ID, updateInput: { username, email } }) {
      let user = await User.findById(ID);

      if (!user) {
        throw new ApolloError(`User not found`);
      }

      const wasEdited = (await User.updateOne({ _id: ID }, { username, email }))
        .matchedCount;

      return wasEdited;
    },

    async deleteUser(_, { ID }) {
      let user = await User.findById(ID);

      if (!user) {
        throw new ApolloError(`User not found`);
      }

      const wasDeleted = (await User.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted;
    },
  },
};

export { userResolvers };
