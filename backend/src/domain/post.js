const postRepository = require('../infra/db/postRepository');

exports.create = async (db, post, creator) => {
  const postId = await postRepository.add(db, post, creator);
  return postId;
};
