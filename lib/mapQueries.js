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

const deleteMap = (id) => {
    return db
    .query(
    `DELETE FROM maps
     WHERE id = $1;`,
     [id])
    .then((data) => {
      return data.rows[0]
    });
};


module.exports = {editMap, deleteMap}
