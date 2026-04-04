const db = require("../database/db");

const getAllSnippets = (keyword, languageId) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT 
        s.id,
        s.title,
        s.code,
        s.description,
        s.language_id,
        l.name AS language_name,
        s.created_at,
        s.updated_at
      FROM snippets s
      LEFT JOIN languages l
      ON s.language_id = l.id
      WHERE 1=1
    `;

    const params = [];

    if (keyword) {
      query += `
        AND (
          s.title LIKE ?
          OR s.code LIKE ?
          OR s.description LIKE ?
        )
      `;
      params.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
    }

    if (languageId) {
      query += ` AND s.language_id = ?`;
      params.push(languageId);
    }

    query += ` ORDER BY s.created_at DESC`;

    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getSnippetById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        s.id,
        s.title,
        s.code,
        s.description,
        s.language_id,
        l.name AS language_name,
        s.created_at,
        s.updated_at
      FROM snippets s
      LEFT JOIN languages l
      ON s.language_id = l.id
      WHERE s.id = ?
    `;

    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const findSnippetById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT *
      FROM snippets
      WHERE id = ?
    `;

    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const createSnippet = ({ title, code, description, language_id }) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO snippets (title, code, description, language_id)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [title, code, description || null, language_id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
};

const updateSnippet = ({ id, title, code, description, language_id }) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE snippets
      SET
        title = ?,
        code = ?,
        description = ?,
        language_id = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.run(
      query,
      [title, code, description || null, language_id, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      }
    );
  });
};

const deleteSnippet = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM snippets
      WHERE id = ?
    `;

    db.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ changes: this.changes });
      }
    });
  });
};

module.exports = {
  getAllSnippets,
  getSnippetById,
  findSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
};