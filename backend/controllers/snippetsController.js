const snippetsService = require("../services/snippetsService");
const { successResponse, errorResponse } = require("../utils/response");

const getAllSnippets = async (req, res) => {
  try {
    const { keyword, language_id } = req.query || {};
    const snippets = await snippetsService.getAllSnippets(keyword, language_id);

    return successResponse(res, "Snippets fetched successfully", snippets);
  } catch (error) {
    console.error("GET /snippets error:", error.message);
    return errorResponse(res, "Failed to fetch snippets", 500);
  }
};

const getSnippetById = async (req, res) => {
  try {
    const { id } = req.params;
    const snippet = await snippetsService.getSnippetById(id);

    return successResponse(res, "Snippet fetched successfully", snippet);
  } catch (error) {
    console.error(`GET /snippets/${req.params.id} error:`, error.message);

    if (error.message === "Snippet not found") {
      return errorResponse(res, error.message, 404);
    }

    return errorResponse(res, "Failed to fetch snippet", 500);
  }
};

const createSnippet = async (req, res) => {
  try {
    const createdSnippet = await snippetsService.createSnippet(req.body);

    return successResponse(res, "Snippet created successfully", createdSnippet, 201);
  } catch (error) {
    console.error("POST /snippets error:", error.message);

    if (error.message === "Title and code are required") {
      return errorResponse(res, error.message, 400);
    }

    return errorResponse(res, "Failed to create snippet", 500);
  }
};

const updateSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSnippet = await snippetsService.updateSnippet(id, req.body);

    return successResponse(res, "Snippet updated successfully", updatedSnippet);
  } catch (error) {
    console.error(`PUT /snippets/${req.params.id} error:`, error.message);

    if (error.message === "Snippet not found") {
      return errorResponse(res, error.message, 404);
    }

    if (error.message === "Title and code are required") {
      return errorResponse(res, error.message, 400);
    }

    return errorResponse(res, "Failed to update snippet", 500);
  }
};

const deleteSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await snippetsService.deleteSnippet(id);

    return successResponse(res, "Snippet deleted successfully", result);
  } catch (error) {
    console.error(`DELETE /snippets/${req.params.id} error:`, error.message);

    if (error.message === "Snippet not found") {
      return errorResponse(res, error.message, 404);
    }

    return errorResponse(res, "Failed to delete snippet", 500);
  }
};

module.exports = {
  getAllSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
};