const bcrypt = require('bcrypt');
const userRepository = require('../infra/db/userRepository');

const saltRounds = 10;
const dummyHash = bcrypt.hashSync('dummy_password', saltRounds);

exports.create = async (db, username, email, password) => {
  let user = null;

  user = await userRepository.findByUsername(db, username);

  // If a user with the username already exists
  // then a user with the same username cannot be created.
  if (user) {
    return { error: 'USERNAME_TAKEN' };
  }

  user = await userRepository.findByEmail(db, email);
  // If a user with the email already exists
  // then a user with the same email cannot be created.
  if (user) {
    return { error: 'EMAIL_TAKEN' };
  }

  const hash = await bcrypt.hash(password, saltRounds);

  await userRepository.add(db, username, email, hash);
  return { success: 'ACCOUNT_CREATED' };
};

exports.authenticate = async (db, email, password) => {
  const user = await userRepository.findByEmail(db, email);

  if (!user) {
    // Protect against timing-based user enumeration
    await bcrypt.compare('dummy_password', dummyHash);
    return null;
  }

  const result = await bcrypt.compare(password, user.password);

  if (result) {
    return {
      username: user.username,
      email: user.email,
    };
  }

  return null;
};
