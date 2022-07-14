// Config for express server nodejs
const http = require('http');
const mongoose = require('mongoose');

const { loadPlanetsData } = require('./models/planets.model');

const app = require('./app');

const PORT = process.env.PORT || 8000;

const MONGO_URL = process.env.MONGO_URI || 'mongodb+srv://nasa-api:BaHeVtAr49Sop5TU@cluster0.8rown.mongodb.net/nasa?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('Mongoose is connected');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
})

async function startServer() {
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();