const bcrypt = require('bcrypt');
const userRepository = require('../infra/db/userRepository');

const saltRounds = 10;
const dummyHash = bcrypt.hashSync('dummy_password', saltRounds);

exports.create = async (db, email, password) => {
  const user = await userRepository.findByEmail(db, email);
  // If a user with the email already exists
  // then a user with the same email cannot be created.
  if (user) {
    return false;
  }

  const hash = await bcrypt.hash(password, saltRounds);

  await userRepository.add(db, email, hash);
  return true;
};

exports.authenticate = async (db, email, password) => {
  const user = await userRepository.findByEmail(db, email);

  if (!user) {
    // Protect against timing-based user enumeration
    await bcrypt.compare('dummy_password', dummyHash);
    return false;
  }

  return bcrypt.compare(password, user.password);
};
