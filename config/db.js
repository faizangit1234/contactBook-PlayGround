const mongoose = require('mongoose');

const connetDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log('db connected successfully');
  } catch (error) {
    throw (new Error('db connection failed ', error), process.exit(1));
  }
};

module.exports = connetDb;
