const express = require('express');

// cross-origin requests
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
