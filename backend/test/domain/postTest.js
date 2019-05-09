const { expect } = require('chai');
const pg = require('pg');
const post = require('../../src/domain/post.js');
const postRepository = require('../../src/infra/db/postRepository.js');
const userRepository = require('../../src/infra/db/userRepository.js');

describe('Post creation', function () {
  let db;

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

  it('creates a new post', async function () {
    const userResult = await userRepository.add(db, 'alice', 'alice@example.com', 'alices_password');
    const postResult = await post.create(db, 'test post', userResult.id);
    const result = await postRepository.findById(db, postResult.id);
    expect(result.creator).to.equal(userResult.id);
    expect(result.content).to.equal('test post');
  });
});
