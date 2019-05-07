const user = require('../../src/domain/user.js');

exports.register = async (
  db, username, email, password) => user.create(db, username, email, password);

exports.login = async (db, email, password) => user.authenticate(db, email, password);
