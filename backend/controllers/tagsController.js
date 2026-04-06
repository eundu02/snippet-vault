const tagsService = require("../services/tagsService");
const { successResponse, errorResponse } = require("../utils/response");

const getAllTags = async (req, res) => {
  try {
    const tags = await tagsService.getAllTags();
    return successResponse(res, "Tags fetched successfully", tags);
  } catch (error) {
    return errorResponse(res, "Failed to fetch tags");
  }
};

const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return errorResponse(res, "Tag name is required", 400);
    }

    const newTag = await tagsService.createTag(name.trim());
    return successResponse(res, "Tag created successfully", newTag, 201);
  } catch (error) {
    return errorResponse(res, "Failed to create tag");
  }
};

const getTagsBySnippetId = async (req, res) => {
  try {
    const snippetId = req.params.id;
    const tags = await tagsService.getTagsBySnippetId(snippetId);
    return successResponse(res, "Snippet tags fetched successfully", tags);
  } catch (error) {
    return errorResponse(res, "Failed to fetch snippet tags");
  }
};

const addTagToSnippet = async (req, res) => {
  try {
    const snippetId = req.params.id;
    const { tag_id } = req.body;

    if (!tag_id) {
      return errorResponse(res, "tag_id is required", 400);
    }

    const result = await tagsService.addTagToSnippet(snippetId, tag_id);
    return successResponse(res, "Tag added to snippet successfully", result, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to add tag to snippet");
  }
};

const removeTagFromSnippet = async (req, res) => {
  try {
    const snippetId = req.params.id;
    const tagId = req.params.tagId;

    const result = await tagsService.removeTagFromSnippet(snippetId, tagId);

    if (!result) {
      return errorResponse(res, "Snippet tag relation not found", 404);
    }

    return successResponse(res, "Tag removed from snippet successfully", result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to remove tag from snippet");
  }
};

module.exports = {
  getAllTags,
  createTag,
  getTagsBySnippetId,
  addTagToSnippet,
  removeTagFromSnippet,
};