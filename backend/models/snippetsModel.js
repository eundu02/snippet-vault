const db = require("../database/db");

const getAllSnippets = (keyword, languageId) => {
  return new Promise((resolve, reject) => {
    let query = `
      SELECT DISTINCT
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
      LEFT JOIN snippet_tags st
        ON s.id = st.snippet_id
      LEFT JOIN tags t
        ON st.tag_id = t.id
      WHERE 1=1
    `;

    const params = [];

    if (keyword) {
      query += `
        AND (
          s.title LIKE ?
          OR s.code LIKE ?
          OR s.description LIKE ?
          OR t.name LIKE ?
        )
      `;
      params.push(
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`
      );
    }

    if (languageId) {
      query += ` AND s.language_id = ?`;
      params.push(languageId);
    }

    query += ` ORDER BY s.id DESC`;

    db.all(query, params, async (err, rows) => {
      if (err) {
        reject(err);
      } else {
        try {
          const snippetsWithTags = await Promise.all(
            rows.map(
              (snippet) =>
                new Promise((resolveSnippet, rejectSnippet) => {
                  const tagQuery = `
                    SELECT t.id, t.name
                    FROM tags t
                    INNER JOIN snippet_tags st
                      ON t.id = st.tag_id
                    WHERE st.snippet_id = ?
                    ORDER BY t.name ASC
                  `;

                  db.all(tagQuery, [snippet.id], (tagErr, tagRows) => {
                    if (tagErr) {
                      rejectSnippet(tagErr);
                    } else {
                      resolveSnippet({
                        ...snippet,
                        tags: tagRows || [],
                      });
                    }
                  });
                })
            )
          );

          resolve(snippetsWithTags);
        } catch (innerError) {
          reject(innerError);
        }
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
      } else if (!row) {
        resolve(null);
      } else {
        const tagQuery = `
          SELECT t.id, t.name
          FROM tags t
          INNER JOIN snippet_tags st
            ON t.id = st.tag_id
          WHERE st.snippet_id = ?
          ORDER BY t.name ASC
        `;

        db.all(tagQuery, [id], (tagErr, tagRows) => {
          if (tagErr) {
            reject(tagErr);
          } else {
            resolve({
              ...row,
              tags: tagRows || [],
            });
          }
        });
      }
    });
  });
};

const findSnippetById = (id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM snippets WHERE id = ?`;

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
      INSERT INTO snippets (title, code, description, language_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, datetime('now', 'localtime'), datetime('now', 'localtime'))
    `;

    db.run(query, [title, code, description, language_id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          title,
          code,
          description,
          language_id,
        });
      }
    });
  });
};

const updateSnippet = (id, { title, code, description, language_id }) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE snippets
      SET title = ?, code = ?, description = ?, language_id = ?, updated_at = datetime('now', 'localtime')
      WHERE id = ?
    `;

    db.run(
      query,
      [title, code, description, language_id, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: Number(id),
            updated: this.changes > 0,
          });
        }
      }
    );
  });
};

const deleteSnippet = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM snippets WHERE id = ?`;

    db.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: Number(id),
          deleted: this.changes > 0,
        });
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