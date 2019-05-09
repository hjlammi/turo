exports.add = async (db, post, creator) => {
  const result = await db.query(
    'INSERT INTO "post"(content, creator) VALUES($1, $2) RETURNING id',
    [post, creator],
  );

  return result.rows[0];
};

exports.findById = async (db, id) => {
  const result = await db.query(
    'SELECT * FROM "post" WHERE id = $1',
    [id],
  );

  return result.rows[0];
};

exports.fetchAll = async (db) => {
  const result = await db.query(
    'SELECT * FROM "post" ORDER BY created DESC',
  );

  return result.rows;
};

exports.deleteAll = async (db) => {
  await db.query(
    'DELETE FROM post',
  );
};
