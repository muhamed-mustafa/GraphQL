import mongoose from 'mongoose';

const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1m4vzs3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

export const dbConnection = () => {
  mongoose.connect(URI).then((conn) => {
    console.log(`Database Connected : ${conn.connection.host}`);
  });
};
