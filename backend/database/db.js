const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./snippet-vault.db", (err) => {
  if (err) {
    console.error("DB 연결 실패:", err.message);
  } else {
    console.log("SQLite 연결 성공");
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Languages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Snippets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      code TEXT NOT NULL,
      description TEXT,
      language_id INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (language_id) REFERENCES Languages(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tag_name TEXT NOT NULL UNIQUE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Snippet_Tags (
      snippet_id INTEGER,
      tag_id INTEGER,
      FOREIGN KEY (snippet_id) REFERENCES Snippets(id),
      FOREIGN KEY (tag_id) REFERENCES Tags(id)
    )
  `);
});

module.exports = db;