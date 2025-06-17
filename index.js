const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("ERROR: API_KEY environment variable not set!");
  process.exit(1);
}

app.use((req, res, next) => {
  const apiKeyHeader = req.headers['x-api-key'];
  if (!apiKeyHeader || apiKeyHeader !== API_KEY) {
    return res.status(401).json({ error: "api key invalid" });
  }
  next();
});

app.get('/move', (req, res) => {
  const w = req.query.w;
  if (!w) {
    return res.status(400).json({ error: "missing parameter w" });
  }

  // Your move logic here, for demo just echo w
  res.json({ message: `move command received with w=${w}` });
});

app.get('/', (req, res) => {
  res.send("is running");
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
