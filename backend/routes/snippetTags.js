const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router.get("/:id/tags", tagsController.getTagsBySnippetId);
router.post("/:id/tags", tagsController.addTagToSnippet);

module.exports = router;