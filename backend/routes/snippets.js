const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
  const sql = `
    SELECT 
      snippets.id,
      snippets.title,
      snippets.code,
      snippets.description,
      snippets.created_at,
      snippets.updated_at,
      languages.name AS language
    FROM snippets
    JOIN languages ON snippets.language_id = languages.id
    ORDER BY snippets.created_at DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { title, code, description, language_id } = req.body;

  if (!title || !code || !language_id) {
    return res.status(400).json({
      error: "title, code, language_id는 필수입니다."
    });
  }

  const sql = `
    INSERT INTO snippets (title, code, description, language_id)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [title, code, description || null, language_id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      message: "Snippet created successfully"
    });
  });
});

module.exports = router;