const user = require('../../src/domain/user.js');

exports.register = async (db, username, password) => {
  await user.create(db, username, password);
};
