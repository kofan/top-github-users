const PORT = process.env.NODE_PORT || 9000;
const DIST_DIR = require('path').join(__dirname, 'dist');
const express = require('express');

const app = express();

app
  .use(express.static(DIST_DIR))
  .listen(PORT, '0.0.0.0', () => {
    console.log(`Application is running on http://localhost:${PORT}/`);
  });
