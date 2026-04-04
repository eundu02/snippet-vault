const express = require("express");
const router = express.Router();
const snippetsController = require("../controllers/snippetsController");

router.get("/", snippetsController.getAllSnippets);
router.get("/:id", snippetsController.getSnippetById);
router.post("/", snippetsController.createSnippet);
router.put("/:id", snippetsController.updateSnippet);
router.delete("/:id", snippetsController.deleteSnippet);

module.exports = router;