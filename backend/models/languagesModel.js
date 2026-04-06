const db = require("../database/db");

const getAllLanguages = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, name FROM languages ORDER BY name ASC`;

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const findLanguageById = (languageId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, name FROM languages WHERE id = ?`;

    db.get(query, [languageId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const findLanguageByName = (name) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, name FROM languages WHERE name = ?`;

    db.get(query, [name], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const createLanguage = (name) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO languages (name) VALUES (?)`;

    db.run(query, [name], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          name,
        });
      }
    });
  });
};

const countSnippetsByLanguageId = (languageId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS count FROM snippets WHERE language_id = ?`;

    db.get(query, [languageId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row.count);
      }
    });
  });
};

const deleteLanguage = (languageId) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM languages WHERE id = ?`;

    db.run(query, [languageId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: Number(languageId),
          deleted: this.changes > 0,
        });
      }
    });
  });
};

module.exports = {
  getAllLanguages,
  findLanguageById,
  findLanguageByName,
  createLanguage,
  countSnippetsByLanguageId,
  deleteLanguage,
};