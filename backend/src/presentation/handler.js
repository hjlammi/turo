const serverless = require('serverless-http');
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const session = require('express-session');
const PGSession = require('connect-pg-simple')(session);

const userService = require('../application/userService');

const dbPool = new pg.Pool({
  host: 'localhost',
  port: 5432,
  database: 'turo_db',
  user: 'turo',
  password: 'turo123',
});

const app = express();
app.use(bodyParser.json()); // for parsing application/json

const sess = {
  store: new PGSession({ pool: dbPool }),
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  resave: false,
  saveUninitialized: true,
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

const withDb = async (f) => {
  const db = await dbPool.connect();

  try {
    await f(db);
  } finally {
    await db.release();
  }
};

app.post('/users/register', async (req, res) => {
  const { email, password } = req.body;

  await withDb(async (db) => {
    const result = await userService.register(db, email, password);
    if (result) {
      res.send(200);
    } else {
      res.send(400);
    }
  });
});

app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  await withDb(async (db) => {
    const result = await userService.login(db, email, password);
    if (result) {
      res.send(200);
    } else {
      res.send(400);
    }
  });
});

// Used only in dev env for emptying db for tests.
// Must be disabled for production!
if (process.env.E2E_API_ENABLED) {
  /* eslint-disable global-require */
  const e2eUserService = require('../application/e2e/userService');
  /* eslint-enable global-require */
  app.delete('/e2e/users', async (req, res) => {
    await withDb(async (db) => {
      await e2eUserService.deleteAll(db);
      res.send(200);
    });
  });
}

module.exports.handler = serverless(app);
