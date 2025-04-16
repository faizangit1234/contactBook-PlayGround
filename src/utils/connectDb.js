const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log('database connected');
    if (!conn) {
      throw new Error('invalid url , credentials not valid');
    }
  } catch (error) {
    console.error('database connection failed', error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
