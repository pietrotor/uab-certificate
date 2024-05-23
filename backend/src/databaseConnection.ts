import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
  try {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL must be defined');
    }
    console.log('🚀 ~ connectToDatabase ~ process.env.DB_URL:', process.env.DB_URL);
    const options = {
      autoIndex: false,
      maxPoolSize: 20,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.DB_URL, options);
  } catch (error) {
    console.clear();
    console.log('🚀 ~ connectToDatabase ~ error:', error);
    setTimeout(async () => {
      await connectToDatabase();
    }, 5000);
  }
};

export { connectToDatabase };
