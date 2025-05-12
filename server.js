const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store messages in memory (you might want to use a database in production)
let messages = [];

// Endpoint to receive messages
app.post('/messages', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  
  messages.push({
    message,
    timestamp: new Date().toISOString()
  });
  
  console.log('Received message:', message);
  res.status(200).json({ success: true });
});

// Endpoint to get all messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
