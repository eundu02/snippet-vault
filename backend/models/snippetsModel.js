const db = require("../database/db");

// 전체 조회 + 검색 + 언어 필터
const getAllSnippets = ({ keyword, language_id }) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT 
        s.id,
        s.title,
        s.code,
        s.description,
        s.language_id,
        s.created_at,
        s.updated_at,
        l.name AS language
      FROM snippets s
      LEFT JOIN languages l ON s.language_id = l.id
      WHERE 1=1
    `;

    const params = [];

    if (keyword) {
      sql += `
        AND (
          s.title LIKE ?
          OR s.code LIKE ?
          OR s.description LIKE ?
        )
      `;
      const keywordParam = `%${keyword}%`;
      params.push(keywordParam, keywordParam, keywordParam);
    }

    if (language_id) {
      sql += ` AND s.language_id = ? `;
      params.push(language_id);
    }

    sql += ` ORDER BY s.id DESC `;

    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

// 단건 조회
const getSnippetById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        s.id,
        s.title,
        s.code,
        s.description,
        s.language_id,
        s.created_at,
        s.updated_at,
        l.name AS language
      FROM snippets s
      LEFT JOIN languages l ON s.language_id = l.id
      WHERE s.id = ?
    `;

    db.get(sql, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

// 생성
const createSnippet = ({ title, code, description, language_id }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO snippets (
        title,
        code,
        description,
        language_id,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
    `;

    db.run(
      sql,
      [title, code, description || "", language_id || null],
      function (err) {
        if (err) return reject(err);

        resolve({
          id: this.lastID,
        });
      }
    );
  });
};

// 존재 확인
const findSnippetById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id FROM snippets WHERE id = ?`;

    db.get(sql, [id], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

// 수정
const updateSnippet = ({ id, title, code, description, language_id }) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE snippets
      SET
        title = ?,
        code = ?,
        description = ?,
        language_id = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `;

    db.run(
      sql,
      [title, code, description || "", language_id || null, id],
      function (err) {
        if (err) return reject(err);

        resolve({
          changes: this.changes,
        });
      }
    );
  });
};

// 삭제
const deleteSnippet = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM snippets WHERE id = ?`;

    db.run(sql, [id], function (err) {
      if (err) return reject(err);

      resolve({
        changes: this.changes,
      });
    });
  });
};

module.exports = {
  getAllSnippets,
  getSnippetById,
  createSnippet,
  findSnippetById,
  updateSnippet,
  deleteSnippet,
};