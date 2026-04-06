const express = require("express");
const cors = require("cors");

const snippetsRoutes = require("./routes/snippets");
const languagesRoutes = require("./routes/languages");
const tagsRoutes = require("./routes/tags");
const snippetTagsRoutes = require("./routes/snippetTags");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/snippets", snippetsRoutes);
app.use("/snippets", snippetTagsRoutes);
app.use("/languages", languagesRoutes);
app.use("/tags", tagsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});