const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URI || 'mongodb+srv://nasa-api:BaHeVtAr49Sop5TU@cluster0.8rown.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect () {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect () {
  return await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}