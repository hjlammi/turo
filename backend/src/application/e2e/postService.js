const postRepository = require('../../../src/infra/db/postRepository.js');

exports.deleteAll = async db => postRepository.deleteAll(db);
