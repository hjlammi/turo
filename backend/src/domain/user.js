const bcrypt = require('bcrypt');
const userRepository = require('../infra/db/userRepository');

const saltRounds = 10;
const dummyHash = bcrypt.hashSync('dummy_password', saltRounds);

exports.create = async (db, username, password) => {
  const user = await userRepository.findByUsername(db, username);
  // If a user with the username already exists
  // then a user with the same username cannot be created.
  if (user) {
    return false;
  }

  const hash = await bcrypt.hash(password, saltRounds);

  await userRepository.add(db, username, hash);
  return true;
};

exports.authenticate = async (db, username, password) => {
  const user = await userRepository.findByUsername(db, username);

  if (!user) {
    // Protect against timing-based user enumeration
    await bcrypt.compare('dummy_password', dummyHash);
    return false;
  }

  return bcrypt.compare(password, user.password);
};
