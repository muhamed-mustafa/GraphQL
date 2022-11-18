import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

const User = model('User', userSchema);

export { User };
