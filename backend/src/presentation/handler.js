const serverless = require('serverless-http');
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');

const userService = require('../application/userService');

const app = express();
app.use(bodyParser.json()); // for parsing application/json

const withDb = async (f) => {
  const db = new pg.Client({
    host: 'localhost',
    port: 5432,
    database: 'turo_db',
    user: 'turo',
    password: 'turo123',
  });

  await db.connect();
  await f(db);
  await db.end();
};

app.post('/users/register', async (req, res) => {
  const { username, password } = req.body;

  await withDb(async (db) => {
    const result = await userService.register(db, username, password);
    if (result) {
      res.send(200);
    } else {
      res.send(400);
    }
  });
});


    res.send(400);
  });
});

module.exports.handler = serverless(app);
