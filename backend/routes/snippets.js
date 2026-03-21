const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
  db.all("SELECT * FROM Snippets", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { title, code, description, language_id } = req.body;

  const sql = `
    INSERT INTO Snippets (title, code, description, language_id)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [title, code, description, language_id], function (err) {
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