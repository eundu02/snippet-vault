const db = require("../database/db");

const getAllTags = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id, name FROM tags ORDER BY name ASC`;

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const createTag = (name) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO tags (name) VALUES (?)`;

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

const getTagsBySnippetId = (snippetId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT t.id, t.name
      FROM tags t
      INNER JOIN snippet_tags st
        ON t.id = st.tag_id
      WHERE st.snippet_id = ?
      ORDER BY t.name ASC
    `;

    db.all(query, [snippetId], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const findSnippetTag = (snippetId, tagId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT snippet_id, tag_id
      FROM snippet_tags
      WHERE snippet_id = ? AND tag_id = ?
    `;

    db.get(query, [snippetId, tagId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const addTagToSnippet = (snippetId, tagId) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO snippet_tags (snippet_id, tag_id)
      VALUES (?, ?)
    `;

    db.run(query, [snippetId, tagId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          snippet_id: Number(snippetId),
          tag_id: Number(tagId),
        });
      }
    });
  });
};

const removeTagFromSnippet = (snippetId, tagId) => {
  return new Promise((resolve, reject) => {
    const query = `
      DELETE FROM snippet_tags
      WHERE snippet_id = ? AND tag_id = ?
    `;

    db.run(query, [snippetId, tagId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          snippet_id: Number(snippetId),
          tag_id: Number(tagId),
          deleted: this.changes > 0,
        });
      }
    });
  });
};

module.exports = {
  getAllTags,
  createTag,
  getTagsBySnippetId,
  findSnippetTag,
  addTagToSnippet,
  removeTagFromSnippet,
};