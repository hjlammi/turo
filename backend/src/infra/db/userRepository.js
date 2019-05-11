exports.findByEmail = async (db, email) => {
  const result = await db.query(
    'SELECT * FROM "user" WHERE email = $1',
    [email],
  );

  return result.rows[0];
};

exports.findByUsername = async (db, username) => {
  const result = await db.query(
    'SELECT * FROM "user" WHERE username = $1',
    [username],
  );

  return result.rows[0];
};

exports.add = async (db, username, email, hashedPassword) => {
  const result = await db.query(
    'INSERT INTO "user"(username, email, password) VALUES($1, $2, $3) RETURNING id',
    [username, email, hashedPassword],
  );

  return result.rows[0];
};

exports.getUserData = async (db, userId) => {
  const result = await db.query(
    'SELECT * FROM "user" WHERE id = $1',
    [userId],
  );

  return result.rows[0];
};

exports.deleteAll = async (db) => {
  await db.query(
    'DELETE FROM "user"',
  );
};
