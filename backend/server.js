const express = require("express");
const cors = require("cors");
const snippetsRoutes = require("./routes/snippets");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Snippet-Vault API Server is running");
});

app.use("/snippets", snippetsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});