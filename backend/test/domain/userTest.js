const { expect } = require('chai');
const user = require('../../src/domain/user.js');
const { db, withDb } = require('../dbInit.js');

describe('User authentication', function () {
  withDb();

  it('fails with an unknown user', async function () {
    const result = await user.authenticate(db(), 'mary@example.com', 'secret_password');
    expect(result).to.equal(null);
  });

  it('fails with a wrong password', async function () {
    await user.create(db(), 'mary', 'mary@example.com', 'secret_password');
    const result = await user.authenticate(db(), 'mary@example.com', 'wrong_password');
    expect(result).to.equal(null);
  });

  it('succeeds with the correct password', async function () {
    await user.create(db(), 'mary', 'mary@example.com', 'secret_password');
    const result = await user.authenticate(db(), 'mary@example.com', 'secret_password');
    expect(result.username).to.equal('mary');
    expect(result.email).to.equal('mary@example.com');
  });
});

describe('User creation', function () {
  withDb();

  it('fails when tries to create a user with an existing username', async function () {
    await user.create(db(), 'mary', 'mary@example.com', 'secret_password');
    const result = await user.create(db(), 'mary', 'other_mary@example.com', 'secret_password');
    expect(result).to.deep.equal({ error: 'USERNAME_TAKEN' });
  });

  it('succeeds with a non-existing username', async function () {
    await user.create(db(), 'another_user', 'another_user@example.com', 'another_password');
    const result = await user.create(db(), 'mary', 'mary@example.com', 'secret_password');
    expect(result).to.deep.equal({ success: 'ACCOUNT_CREATED' });
  });

  it('fails when tries to create a user with an existing email', async function () {
    await user.create(db(), 'mary', 'mary@example.com', 'secret_password');
    const result = await user.create(db(), 'mary2', 'mary@example.com', 'secret_password');
    expect(result).to.deep.equal({ error: 'EMAIL_TAKEN' });
  });

  it('succeeds with a non-existing email', async function () {
    await user.create(db(), 'another_user', 'another_user@example.com', 'another_password');
    const result = await user.create(db(), 'mary', 'mary@example.com', 'secret_password');
    expect(result).to.deep.equal({ success: 'ACCOUNT_CREATED' });
  });
});

describe('Getting user data', function () {
  withDb();

  it('fails with non-existing userId', async function () {
    const result = await user.getUserData(db(), 0);
    expect(result).to.equal(null);
  });

  it('succeeds with an existing userId', async function () {
    await user.create(db(), 'mary', 'mary@example.com', 'secret_password');
    const createdUser = await user.authenticate(db(), 'mary@example.com', 'secret_password');
    const result = await user.getUserData(db(), createdUser.id);
    const userData = { id: createdUser.id, username: 'mary', email: 'mary@example.com' };
    expect(result).to.deep.equal(userData);
  });
});
