const postRepository = require('../infra/db/postRepository');

exports.create = async (db, post, creator) => postRepository.add(db, post, creator);
