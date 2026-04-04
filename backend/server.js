const express = require("express");
const cors = require("cors");
const snippetRoutes = require("./routes/snippets");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Snippet-Vault Backend Server");
});

app.use("/snippets", snippetRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});