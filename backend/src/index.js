const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./common/logger');

const port = process.env.port || '3200';
const db = require('./infrastructure/db');

app.use(cors());
app.use(express.json());
app.use(require('./application'));

app.listen(port, async () => {
  await db.createConnection();
  logger.info(`Running server at port ${port}`);
});
