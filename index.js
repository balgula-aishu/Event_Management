const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
// const db = require('./models/db');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

// app.get('/', (req, res) => {
//     res.send('Welcome to the Event Management Platform API');
//   });
  
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});