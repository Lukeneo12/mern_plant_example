const serverless = require('serverless-http');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(require('../application'));


module.exports.handler = serverless(app);
