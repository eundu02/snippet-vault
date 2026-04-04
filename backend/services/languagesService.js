const languagesModel = require("../models/languagesModel");

const getAllLanguages = async () => {
  return await languagesModel.getAllLanguages();
};

module.exports = {
  getAllLanguages,
};