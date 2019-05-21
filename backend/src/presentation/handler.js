const serverless = require('serverless-http');
const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const session = require('express-session');
const PGSession = require('connect-pg-simple')(session);
const csrf = require('csurf');

const userService = require('../application/userService');
const postService = require('../application/postService');

const dbPool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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

const withDb = async (f) => {
  const db = await dbPool.connect();

  try {
    await f(db);
  } finally {
    await db.release();
  }
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true;
}

app.use(session(sess));

const e2eRouter = () => {
  const e2e = new express.Router();

  /* eslint-disable global-require */
  const e2eUserService = require('../application/e2e/userService');
  /* eslint-enable global-require */
  e2e.delete('/users', async (req, res) => {
    await withDb(async (db) => {
      await e2eUserService.deleteAll(db);
      res.sendStatus(200);
    });
  });

  return e2e;
};

// Used only in dev env for emptying db for tests.
// Must be disabled for production!
if (process.env.E2E_API_ENABLED) {
  app.use('/e2e', e2eRouter());
}

app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.sendStatus(403);
  } else {
    next(err);
  }
});

app.get('/csrf-token', async (req, res) => {
  const csrfToken = req.csrfToken();
  res.status(200).send(csrfToken);
});

app.post('/users/register', async (req, res) => {
  const { username, email, password } = req.body;

  const validEmail = email.match(/.@./g);

  if (!validEmail) {
    res.status(400).json({ error: 'INVALID_EMAIL' });
  } else if (!username.match(/^\w+$/)) {
    res.status(400).json({ error: 'INVALID_USERNAME' });
  } else if (password.length < 10) {
    res.status(400).json({ error: 'TOO_SHORT_PASSWORD' });
  } else {
    await withDb(async (db) => {
      const result = await userService.register(db, username, email, password);
      if (result.success) {
        res.status(200).json({ success: result.success });
      } else if (result.error === 'USERNAME_TAKEN') {
        res.status(409).json({ error: result.error });
      } else if (result.error === 'EMAIL_TAKEN') {
        res.status(409).json({ error: result.error });
      } else {
        res.sendStatus(500);
      }
    });
  }
});

app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  await withDb(async (db) => {
    const user = await userService.login(db, email, password);
    if (user) {
      req.session.userId = user.id;
      res.json(user).status(200);
    } else {
      res.sendStatus(400);
    }
  });
});

app.post('/users/logout', async (req, res) => {
  req.session.destroy();
  res.send(200);
});

app.get('/users/me', async (req, res) => {
  // If session has userId stored it means that user is logged in
  // (session hasn't been destroy by user logging out or session being expired)
  if (req.session.userId) {
    await withDb(async (db) => {
      const user = await userService.getUserData(db, req.session.userId);
      if (user) {
        res.json(user).status(200);
      } else {
        res.sendStatus(404);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

app.post('/posts', async (req, res) => {
  const { post } = req.body;
  if (post.length <= 500) {
    if (req.session.userId) {
      await withDb(async (db) => {
        const result = await postService.create(db, post, req.session.userId);
        if (result) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      });
    } else {
      res.sendStatus(403);
    }
  } else {
    res.status(413).send('TOO_LONG_POST');
  }
});

app.get('/posts', async (req, res) => {
  if (req.session.userId) {
    await withDb(async (db) => {
      const result = await postService.fetchAll(db);
      if (result) {
        res.json(result).status(200);
      } else {
        res.sendStatus(500);
      }
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports.handler = serverless(app);
