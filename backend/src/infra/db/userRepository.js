exports.findByEmail = async (db, email) => {
  const result = await db.query(
    'SELECT * FROM "user" WHERE email = $1',
    [email],
  );

  return result.rows[0];
};

exports.add = async (db, email, hashedPassword) => {
  await db.query(
    'INSERT INTO "user"(email, password) VALUES($1, $2)',
    [email, hashedPassword],
  );
};

exports.deleteAll = async (db) => {
  await db.query(
    'DELETE FROM "user"',
  );
};
