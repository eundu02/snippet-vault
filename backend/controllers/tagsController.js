const tagsService = require("../services/tagsService");
const { successResponse, errorResponse } = require("../utils/response");

const getAllTags = async (req, res) => {
  try {
    const tags = await tagsService.getAllTags();
    return successResponse(res, "Tags fetched successfully", tags);
  } catch (error) {
    console.error("GET /tags error:", error.message);
    return errorResponse(res, "Failed to fetch tags", 500);
  }
};

const createTag = async (req, res) => {
  try {
    const createdTag = await tagsService.createTag(req.body);
    return successResponse(res, "Tag created successfully", createdTag, 201);
  } catch (error) {
    console.error("POST /tags error:", error.message);

    if (error.message === "Tag name is required") {
      return errorResponse(res, error.message, 400);
    }

    if (error.message === "Tag already exists") {
      return errorResponse(res, error.message, 409);
    }

    return errorResponse(res, "Failed to create tag", 500);
  }
};

const getTagsBySnippetId = async (req, res) => {
  try {
    const { id } = req.params;
    const tags = await tagsService.getTagsBySnippetId(id);
    return successResponse(res, "Snippet tags fetched successfully", tags);
  } catch (error) {
    console.error(`GET /snippets/${req.params.id}/tags error:`, error.message);

    if (error.message === "Snippet not found") {
      return errorResponse(res, error.message, 404);
    }

    return errorResponse(res, "Failed to fetch snippet tags", 500);
  }
};

const addTagToSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const { tag_id } = req.body;

    if (!tag_id) {
      return errorResponse(res, "tag_id is required", 400);
    }

    const tags = await tagsService.addTagToSnippet(id, tag_id);
    return successResponse(res, "Tag linked to snippet successfully", tags, 201);
  } catch (error) {
    console.error(`POST /snippets/${req.params.id}/tags error:`, error.message);

    if (
      error.message === "Snippet not found" ||
      error.message === "Tag not found"
    ) {
      return errorResponse(res, error.message, 404);
    }

    if (error.message === "Tag is already linked to this snippet") {
      return errorResponse(res, error.message, 409);
    }

    return errorResponse(res, "Failed to link tag to snippet", 500);
  }
};

module.exports = {
  getAllTags,
  createTag,
  getTagsBySnippetId,
  addTagToSnippet,
};