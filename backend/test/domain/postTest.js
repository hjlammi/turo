const { expect } = require('chai');
const post = require('../../src/domain/post.js');
const postRepository = require('../../src/infra/db/postRepository.js');
const userRepository = require('../../src/infra/db/userRepository.js');
const { db, withDb } = require('../dbInit.js');

describe('Post creation', function () {
  withDb();

  let user1Id;
  let user2Id;
  beforeEach(async function () {
    const userResult1 = await userRepository.add(db(), 'alice', 'alice@example.com', 'alices_password');
    user1Id = userResult1.id;
    const userResult2 = await userRepository.add(db(), 'emma', 'emma@example.com', 'emmas_password');
    user2Id = userResult2.id;
  });

  it('creates a new post', async function () {
    const postResult = await post.create(db(), 'test post1', user1Id);
    const result = await postRepository.findById(db(), postResult.id);
    expect(result.creator).to.equal(user1Id);
    expect(result.content).to.equal('test post1');
  });

  it('fetches all created posts and checks that timestamps are in descending order', async function () {
    await post.create(db(), 'test post1', user1Id);
    await post.create(db(), 'test post2', user1Id);
    await post.create(db(), 'test post3', user1Id);
    const result = await postRepository.fetchAll(db());
    expect(result.length).to.equal(3);
    expect(result[0].created).to.be.gt(result[1].created);
    expect(result[1].created).to.be.gt(result[2].created);
  });

  it('fetches all created posts and checks that usernames are correct for each post', async function () {
    await post.create(db(), 'test post1', user1Id);
    await post.create(db(), 'test post2', user1Id);
    await post.create(db(), 'test post3', user2Id);
    const result = await postRepository.fetchAll(db());
    expect(result.length).to.equal(3);
    expect(result[0].username).to.equal('emma');
    expect(result[1].username).to.equal('alice');
    expect(result[2].username).to.equal('alice');
  });
});
