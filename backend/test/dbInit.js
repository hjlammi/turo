const pg = require('pg');
const postRepository = require('../src/infra/db/postRepository.js');
const userRepository = require('../src/infra/db/userRepository.js');

let db;

exports.db = () => db;

exports.withDb = async () => {
  before(async function () {
    db = new pg.Client({
      host: 'localhost',
      port: 5432,
      database: 'turo_db',
      user: 'turo',
      password: 'turo123',
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
