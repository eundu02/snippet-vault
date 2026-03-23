const express = require("express");
const router = express.Router();
const db = require("../database/db");

// 전체 조회
router.get("/", (req, res) => {
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
    ORDER BY s.id DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("GET /snippets error:", err.message);
      return res.status(500).json({
        message: "Failed to fetch snippets"
      });
    }

    return res.status(200).json(rows);
  });
});

// 단건 조회
router.get("/:id", (req, res) => {
  const { id } = req.params;

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
    if (err) {
      console.error("GET /snippets/:id error:", err.message);
      return res.status(500).json({
        message: "Failed to fetch snippet"
      });
    }

    if (!row) {
      return res.status(404).json({
        message: "Snippet not found"
      });
    }

    return res.status(200).json(row);
  });
});

// 생성
router.post("/", (req, res) => {
  const { title, code, description, language_id } = req.body;

  if (!title || !code) {
    return res.status(400).json({
      message: "title and code are required"
    });
  }

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
      if (err) {
        console.error("POST /snippets error:", err.message);
        return res.status(500).json({
          message: "Failed to create snippet"
        });
      }

      return res.status(201).json({
        id: this.lastID,
        message: "Snippet created successfully"
      });
    }
  );
});

// 수정
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, code, description, language_id } = req.body;

  if (!title || !code) {
    return res.status(400).json({
      message: "title and code are required"
    });
  }

  const checkSql = `SELECT id FROM snippets WHERE id = ?`;

  db.get(checkSql, [id], (checkErr, existingSnippet) => {
    if (checkErr) {
      console.error("PUT check error:", checkErr.message);
      return res.status(500).json({
        message: "Failed to check snippet"
      });
    }

    if (!existingSnippet) {
      return res.status(404).json({
        message: "Snippet not found"
      });
    }

    const updateSql = `
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
      updateSql,
      [title, code, description || "", language_id || null, id],
      function (updateErr) {
        if (updateErr) {
          console.error("PUT /snippets/:id error:", updateErr.message);
          return res.status(500).json({
            message: "Failed to update snippet"
          });
        }

        return res.status(200).json({
          message: "Snippet updated successfully"
        });
      }
    );
  });
});

// 삭제
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const checkSql = `SELECT id FROM snippets WHERE id = ?`;

  db.get(checkSql, [id], (checkErr, existingSnippet) => {
    if (checkErr) {
      console.error("DELETE check error:", checkErr.message);
      return res.status(500).json({
        message: "Failed to check snippet"
      });
    }

    if (!existingSnippet) {
      return res.status(404).json({
        message: "Snippet not found"
      });
    }

    const deleteSql = `DELETE FROM snippets WHERE id = ?`;

    db.run(deleteSql, [id], function (deleteErr) {
      if (deleteErr) {
        console.error("DELETE /snippets/:id error:", deleteErr.message);
        return res.status(500).json({
          message: "Failed to delete snippet"
        });
      }

      return res.status(200).json({
        message: "Snippet deleted successfully"
      });
    });
  });
});

module.exports = router;