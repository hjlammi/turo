const { expect } = require('chai');
const pg = require('pg');
const user = require('../../src/domain/user.js');

describe('User authentication', function () {
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
    await db.query('DELETE from "user"');
  });

  after(async function () {
    await db.end();
  });

  it('fails with an unknown user', async function () {
    const result = await user.authenticate(db, 'mary@example.com', 'secret_password');
    expect(result).to.equal(null);
  });

  it('fails with a wrong password', async function () {
    await user.create(db, 'mary@example.com', 'secret_password');
    const result = await user.authenticate(db, 'mary@example.com', 'wrong_password');
    expect(result).to.equal(null);
  });

  it('succeeds with the correct password', async function () {
    await user.create(db, 'mary@example.com', 'secret_password');
    const result = await user.authenticate(db, 'mary@example.com', 'secret_password');
    const userResult = {
      username: null,
      email: 'mary@example.com',
    };
    expect(result).to.deep.equal(userResult);
  });

  it('fails when tries to create a user with an existing username', async function () {
    await user.create(db, 'mary@example.com', 'secret_password');
    const result = await user.create(db, 'mary@example.com', 'secret_password');
    expect(result).to.equal(false);
  });
});

describe('User creation', function () {
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
    await db.query('DELETE from "user"');
  });

  after(async function () {
    await db.end();
  });

  it('fails when tries to create a user with an existing username', async function () {
    await user.create(db, 'mary@example.com', 'secret_password');
    const result = await user.create(db, 'mary@example.com', 'secret_password');
    expect(result).to.equal(false);
  });

  it('succeeds with a non-existing username', async function () {
    await user.create(db, 'another_user@example.com', 'another_password');
    const result = await user.create(db, 'mary@example.com', 'secret_password');
    expect(result).to.equal(true);
  });
});
