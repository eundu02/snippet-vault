const languagesModel = require("../models/languagesModel");

const getAllLanguages = async () => {
  const languages = await languagesModel.getAllLanguages();
  return languages;
};

module.exports = {
  getAllLanguages,
};