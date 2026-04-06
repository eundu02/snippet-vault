const languagesModel = require("../models/languagesModel");

const getAllLanguages = async () => {
  return await languagesModel.getAllLanguages();
};

const createLanguage = async (name) => {
  const existingLanguage = await languagesModel.findLanguageByName(name);

  if (existingLanguage) {
    throw new Error("Language already exists");
  }

  return await languagesModel.createLanguage(name);
};

const deleteLanguage = async (languageId) => {
  const existingLanguage = await languagesModel.findLanguageById(languageId);

  if (!existingLanguage) {
    return null;
  }

  const usageCount = await languagesModel.countSnippetsByLanguageId(languageId);

  if (usageCount > 0) {
    throw new Error("This language is being used by existing snippets and cannot be deleted");
  }

  return await languagesModel.deleteLanguage(languageId);
};

module.exports = {
  getAllLanguages,
  createLanguage,
  deleteLanguage,
};