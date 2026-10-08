const express = require('express');
const app = express();
require('dotenv').config();

const port = parseInt(process.env.PORT) || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Cross-origin 설정 (옵션)

// Test Endpoint
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});