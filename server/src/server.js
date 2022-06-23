// Config for express server nodejs
const http = require('http');
const PORT = process.env.PORT || 8000;

const app = require('./app');

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
