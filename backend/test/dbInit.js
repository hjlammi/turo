const pg = require('pg');
const postRepository = require('../src/infra/db/postRepository.js');
const userRepository = require('../src/infra/db/userRepository.js');
require('dotenv').config();

let db;

exports.db = () => db;

exports.withDb = async () => {
  before(async function () {
    db = new pg.Client({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await db.connect();
  });

  beforeEach(async function () {
    await postRepository.deleteAll(db);
    await userRepository.deleteAll(db);
  });

  after(async function () {
    await db.end();
  });
};
