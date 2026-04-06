const db = require("../database/db");

const getTagsBySnippetIds = (snippetIds) => {
  return new Promise((resolve, reject) => {
    if (!snippetIds || snippetIds.length === 0) {
      return resolve([]);
    }

    const placeholders = snippetIds.map(() => "?").join(",");

    const query = `
      SELECT
        st.snippet_id,
        t.id,
        t.name
      FROM snippet_tags st
      INNER JOIN tags t
        ON st.tag_id = t.id
      WHERE st.snippet_id IN (${placeholders})
      ORDER BY t.name ASC
    `;

    db.all(query, snippetIds, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const attachTagsToSnippets = async (snippets) => {
  if (!snippets || snippets.length === 0) {
    return [];
  }

  const snippetIds = snippets.map((snippet) => snippet.id);
  const tagRows = await getTagsBySnippetIds(snippetIds);

  const tagMap = {};

  for (const row of tagRows) {
    if (!tagMap[row.snippet_id]) {
      tagMap[row.snippet_id] = [];
    }

    tagMap[row.snippet_id].push({
      id: row.id,
      name: row.name,
    });
  }

  return snippets.map((snippet) => ({
    ...snippet,
    tags: tagMap[snippet.id] || [],
  }));
};

const getAllSnippets = async (keyword, languageId) => {
  const snippets = await new Promise((resolve, reject) => {
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

    query += ` ORDER BY s.id DESC`;

    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

  return await attachTagsToSnippets(snippets);
};

const getSnippetById = async (id) => {
  const snippet = await new Promise((resolve, reject) => {
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

  if (!snippet) {
    return null;
  }

  const snippetsWithTags = await attachTagsToSnippets([snippet]);
  return snippetsWithTags[0];
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

    const params = [title, code, description || "", language_id || null];

    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          title,
          code,
          description: description || "",
          language_id: language_id || null,
        });
      }
    });
  });
};

const updateSnippet = (id, { title, code, description, language_id }) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE snippets
      SET
        title = ?,
        code = ?,
        description = ?,
        language_id = ?,
        updated_at = datetime('now', 'localtime')
      WHERE id = ?
    `;

    const params = [
      title,
      code,
      description || "",
      language_id || null,
      id,
    ];

    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          changes: this.changes,
        });
      }
    });
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
          changes: this.changes,
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