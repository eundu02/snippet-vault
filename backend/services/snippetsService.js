const snippetsModel = require("../models/snippetsModel");

const getAllSnippets = async ({ keyword, language_id }) => {
  return await snippetsModel.getAllSnippets(keyword, language_id);
};

const getSnippetById = async (id) => {
  return await snippetsModel.getSnippetById(id);
};

const createSnippet = async ({ title, code, description, language_id }) => {
  return await snippetsModel.createSnippet({
    title,
    code,
    description,
    language_id,
  });
};

const updateSnippet = async ({ id, title, code, description, language_id }) => {
  const existingSnippet = await snippetsModel.findSnippetById(id);

  if (!existingSnippet) {
    return null;
  }

  return await snippetsModel.updateSnippet({
    id,
    title,
    code,
    description,
    language_id,
  });
};

const deleteSnippet = async (id) => {
  const existingSnippet = await snippetsModel.findSnippetById(id);

  if (!existingSnippet) {
    return null;
  }

  return await snippetsModel.deleteSnippet(id);
};

module.exports = {
  getAllSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
};

