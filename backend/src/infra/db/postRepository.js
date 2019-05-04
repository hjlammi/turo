exports.deleteAll = async (db) => {
  await db.query(
    'DELETE FROM post',
  );
};
