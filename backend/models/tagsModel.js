const db = require("../database/db");

const getAllTags = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, name
      FROM tags
      ORDER BY name ASC
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getTagById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, name
      FROM tags
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

const getTagByName = (name) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, name
      FROM tags
      WHERE name = ?
    `;

    db.get(query, [name], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const createTag = (name) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO tags (name)
      VALUES (?)
    `;

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
      FROM snippet_tags st
      INNER JOIN tags t
        ON st.tag_id = t.id
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

module.exports = {
  getAllTags,
  getTagById,
  getTagByName,
  createTag,
  getTagsBySnippetId,
  findSnippetTag,
  addTagToSnippet,
};