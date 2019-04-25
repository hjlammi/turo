exports.create = async (db, username, password) => {
  await db.query(
    'INSERT INTO "user"(username, password) VALUES($1, $2)',
    [username, password],
  );
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
