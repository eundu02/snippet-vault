const db = require("../database/db");

const getAllLanguages = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, name
      FROM languages
      ORDER BY name ASC
    `;

    db.all(sql, [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

module.exports = {
  getAllLanguages,
};