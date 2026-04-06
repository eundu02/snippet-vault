const tagsModel = require("../models/tagsModel");

const getAllTags = async () => {
  return await tagsModel.getAllTags();
};

const createTag = async (name) => {
  return await tagsModel.createTag(name);
};

const getTagsBySnippetId = async (snippetId) => {
  return await tagsModel.getTagsBySnippetId(snippetId);
};

const addTagToSnippet = async (snippetId, tagId) => {
  const existingRelation = await tagsModel.findSnippetTag(snippetId, tagId);

  if (existingRelation) {
    throw new Error("This tag is already connected to the snippet");
  }

  return await tagsModel.addTagToSnippet(snippetId, tagId);
};

const removeTagFromSnippet = async (snippetId, tagId) => {
  const existingRelation = await tagsModel.findSnippetTag(snippetId, tagId);

  if (!existingRelation) {
    return null;
  }

  return await tagsModel.removeTagFromSnippet(snippetId, tagId);
};

module.exports = {
  getAllTags,
  createTag,
  getTagsBySnippetId,
  addTagToSnippet,
  removeTagFromSnippet,
};