const express = require('express');

// cross-origin requests
const cors = require('cors');

const authRoutes = require('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

// Setup middleware

// All us to make cross-orgin requests
app.use(cors());

// parse json
app.use(express.json());
// parse form data
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.send('hello, world!');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
