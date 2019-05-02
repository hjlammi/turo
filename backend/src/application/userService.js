const user = require('../../src/domain/user.js');

exports.register = async (db, email, password) => user.create(db, email, password);

exports.login = async (db, email, password) => user.authenticate(db, email, password);
