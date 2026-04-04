const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");

router.get("/", tagsController.getAllTags);
router.post("/", tagsController.createTag);

module.exports = router;