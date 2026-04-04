const express = require("express");
const router = express.Router();
const languagesController = require("../controllers/languagesController");

router.get("/", languagesController.getAllLanguages);

module.exports = router;