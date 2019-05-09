const { expect } = require('chai');
const post = require('../../src/domain/post.js');
const postRepository = require('../../src/infra/db/postRepository.js');
const userRepository = require('../../src/infra/db/userRepository.js');
const { db, withDb } = require('../dbInit.js');

describe('Post creation', function () {
  withDb();

  it('creates a new post', async function () {
    const userResult = await userRepository.add(db(), 'alice', 'alice@example.com', 'alices_password');
    const postResult = await post.create(db(), 'test post', userResult.id);
    const result = await postRepository.findById(db(), postResult.id);
    expect(result.creator).to.equal(userResult.id);
    expect(result.content).to.equal('test post');
  });
});
