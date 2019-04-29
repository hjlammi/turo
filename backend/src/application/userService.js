const user = require('../../src/domain/user.js');

exports.register = async (db, username, password) => user.create(db, username, password);

exports.login = async (db, username, password) => user.authenticate(db, username, password);
