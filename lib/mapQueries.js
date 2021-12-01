const editMap = (map) => {
  const queryString = `
    UPDATE maps
    SET title = $1, description = $2
    WHERE id = $3
    RETURNING *
  `;

  const values = [map.title, map.description, map.id];

  return db
    .query(queryString, values)
    .then(res => res.rows);
};

module.exports = editMap
