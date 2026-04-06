const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router.get("/:id/tags", tagsController.getTagsBySnippetId);
router.post("/:id/tags", tagsController.addTagToSnippet);
router.delete("/:id/tags/:tagId", tagsController.removeTagFromSnippet);

module.exports = router;