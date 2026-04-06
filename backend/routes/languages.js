const express = require("express");
const router = express.Router();
const languagesController = require("../controllers/languagesController");

router.get("/", languagesController.getAllLanguages);
router.post("/", languagesController.createLanguage);
router.delete("/:id", languagesController.deleteLanguage);

module.exports = router;