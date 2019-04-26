exports.create = async (db, username, password) => {
  const result = await db.query(
    'SELECT username FROM "user" WHERE username = $1',
    [username],
  );

  // Insert new user into the user table if a user with the same username doesn't already exist.
  if (result.rowCount === 0) {
    await db.query(
      'INSERT INTO "user"(username, password) VALUES($1, $2)',
      [username, password],
    );

    return true;
  }

  return false;
};

exports.authenticate = async (db, username, password) => {
  const result = await db.query(
    'SELECT password FROM "user" WHERE username = $1',
    [username],
  );

  if (result.rowCount === 0) {
    return false;
  }

  return password === result.rows[0].password;
};
