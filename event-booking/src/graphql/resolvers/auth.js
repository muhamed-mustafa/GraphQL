import { User } from '../../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authResolver = {
  createUser: async (args) => {
    let user = await User.findOne({ email: args.userInput.email });
    if (user) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    user = new User({
      email: args.userInput.email,
      password: hashedPassword,
    });

    await user.save();
    delete user.password;
    return { ...user._doc, _id: user._id.toString() };
  },

  login: async ({ email, password }) => {
    let user = await User.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.SECRET_KEY,
        {
          expiresIn: '1h',
        }
      );

      return { userId: user.id, token: token, tokenExpiration: 1 };
    } else {
      throw new Error('Invalid email or password');
    }
  },
};

export { authResolver };
