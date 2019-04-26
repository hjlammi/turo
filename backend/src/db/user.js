exports.findByUsername = async (db, username) => {
  const result = await db.query(
    'SELECT * FROM "user" WHERE username = $1',
    [username],
  );

  return result.rows[0];
};

exports.add = async (db, username, hashedPassword) => {
  await db.query(
    'INSERT INTO "user"(username, password) VALUES($1, $2)',
    [username, hashedPassword],
  );
};
