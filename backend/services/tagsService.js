const tagsModel = require("../models/tagsModel");
const snippetsModel = require("../models/snippetsModel");

const getAllTags = async () => {
  const tags = await tagsModel.getAllTags();
  return tags;
};

const createTag = async (tagData) => {
  const { name } = tagData;

  if (!name || !name.trim()) {
    throw new Error("Tag name is required");
  }

  const trimmedName = name.trim();

  const existingTag = await tagsModel.getTagByName(trimmedName);
  if (existingTag) {
    throw new Error("Tag already exists");
  }

  const createdTag = await tagsModel.createTag(trimmedName);
  return createdTag;
};

const getTagsBySnippetId = async (snippetId) => {
  const snippet = await snippetsModel.findSnippetById(snippetId);

  if (!snippet) {
    throw new Error("Snippet not found");
  }

  const tags = await tagsModel.getTagsBySnippetId(snippetId);
  return tags;
};

const addTagToSnippet = async (snippetId, tagId) => {
  const snippet = await snippetsModel.findSnippetById(snippetId);
  if (!snippet) {
    throw new Error("Snippet not found");
  }

  const tag = await tagsModel.getTagById(tagId);
  if (!tag) {
    throw new Error("Tag not found");
  }

  const existingRelation = await tagsModel.findSnippetTag(snippetId, tagId);
  if (existingRelation) {
    throw new Error("Tag is already linked to this snippet");
  }

  await tagsModel.addTagToSnippet(snippetId, tagId);

  const tags = await tagsModel.getTagsBySnippetId(snippetId);
  return tags;
};

module.exports = {
  getAllTags,
  createTag,
  getTagsBySnippetId,
  addTagToSnippet,
};