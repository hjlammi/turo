const user = require('../../src/domain/post.js');

exports.create = async (
  db, post, creator) => user.create(db, post, creator);
