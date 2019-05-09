const { expect } = require('chai');
const post = require('../../src/domain/post.js');
const postRepository = require('../../src/infra/db/postRepository.js');
const userRepository = require('../../src/infra/db/userRepository.js');
const { db, withDb } = require('../dbInit.js');

describe('Post creation', function () {
  withDb();

  let userId;
  beforeEach(async function () {
    const userResult = await userRepository.add(db(), 'alice', 'alice@example.com', 'alices_password');
    userId = userResult.id;
  });

  it('creates a new post', async function () {
    const postResult = await post.create(db(), 'test post1', userId);
    const result = await postRepository.findById(db(), postResult.id);
    expect(result.creator).to.equal(userId);
    expect(result.content).to.equal('test post1');
  });

  it('fetches all created posts', async function () {
    await post.create(db(), 'test post1', userId);
    await post.create(db(), 'test post2', userId);
    await post.create(db(), 'test post3', userId);
    const result = await postRepository.fetchAll(db());
    expect(result.length).to.equal(3);
    expect(result[0].created).to.be.gt(result[1].created);
    expect(result[1].created).to.be.gt(result[2].created);
  });
});
