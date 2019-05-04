const userRepository = require('../../../src/infra/db/userRepository.js');
const postRepository = require('../../../src/infra/db/postRepository.js');

exports.deleteAll = async (db) => {
  try {
    await db.query('BEGIN');
    await postRepository.deleteAll(db);
    await userRepository.deleteAll(db);
    await db.query('COMMIT');
  } catch (error) {
    await db.query('ROLLBACK');
    throw error;
  }
};
