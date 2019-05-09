const post = require('../../src/domain/post.js');

exports.create = async (
  db, createdPost, creator) => post.create(db, createdPost, creator);

exports.fetchAll = async db => post.fetchAll(db);
