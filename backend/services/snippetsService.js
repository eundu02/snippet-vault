const snippetsModel = require("../models/snippetsModel");

const getAllSnippets = async (keyword, language_id) => {
  const snippets = await snippetsModel.getAllSnippets(keyword, language_id);
  return snippets;
};

const getSnippetById = async (id) => {
  const snippet = await snippetsModel.getSnippetById(id);

  if (!snippet) {
    throw new Error("Snippet not found");
  }

  return snippet;
};

const createSnippet = async (snippetData) => {
  const { title, code, description, language_id } = snippetData;

  if (!title || !code) {
    throw new Error("Title and code are required");
  }

  return await snippetsModel.createSnippet({
    title,
    code,
    description,
    language_id,
  });
};

const updateSnippet = async (id, snippetData) => {
  const existingSnippet = await snippetsModel.findSnippetById(id);

  if (!existingSnippet) {
    throw new Error("Snippet not found");
  }

  const { title, code, description, language_id } = snippetData;

  if (!title || !code) {
    throw new Error("Title and code are required");
  }

  const result = await snippetsModel.updateSnippet(id, {
    title,
    code,
    description,
    language_id,
  });

  if (result.changes === 0) {
    throw new Error("Snippet update failed");
  }

  return await snippetsModel.getSnippetById(id);
};

const deleteSnippet = async (id) => {
  const existingSnippet = await snippetsModel.findSnippetById(id);

  if (!existingSnippet) {
    throw new Error("Snippet not found");
  }

  const result = await snippetsModel.deleteSnippet(id);

  if (result.changes === 0) {
    throw new Error("Snippet delete failed");
  }

  return { id: Number(id) };
};

module.exports = {
  getAllSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
};