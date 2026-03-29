const snippetsService = require("../services/snippetsService");
const { successResponse, errorResponse } = require("../utils/response");

// 전체 조회 + 검색 + 언어 필터
const getAllSnippets = async (req, res) => {
  try {
    const { keyword, language_id } = req.query;

    const snippets = await snippetsService.getAllSnippets({
      keyword,
      language_id,
    });

    return successResponse(res, 200, snippets, "Snippets fetched successfully");
  } catch (error) {
    console.error("GET /snippets error:", error.message);
    return errorResponse(res, 500, "Failed to fetch snippets");
  }
};

// 단건 조회
const getSnippetById = async (req, res) => {
  try {
    const { id } = req.params;

    const snippet = await snippetsService.getSnippetById(id);

    if (!snippet) {
      return errorResponse(res, 404, "Snippet not found");
    }

    return successResponse(res, 200, snippet, "Snippet fetched successfully");
  } catch (error) {
    console.error("GET /snippets/:id error:", error.message);
    return errorResponse(res, 500, "Failed to fetch snippet");
  }
};

// 생성
const createSnippet = async (req, res) => {
  try {
    const { title, code, description, language_id } = req.body;

    if (!title || !code) {
      return errorResponse(res, 400, "title and code are required");
    }

    const result = await snippetsService.createSnippet({
      title,
      code,
      description,
      language_id,
    });

    return successResponse(
      res,
      201,
      { id: result.id },
      "Snippet created successfully"
    );
  } catch (error) {
    console.error("POST /snippets error:", error.message);
    return errorResponse(res, 500, "Failed to create snippet");
  }
};

// 수정
const updateSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, code, description, language_id } = req.body;

    if (!title || !code) {
      return errorResponse(res, 400, "title and code are required");
    }

    const result = await snippetsService.updateSnippet({
      id,
      title,
      code,
      description,
      language_id,
    });

    if (!result) {
      return errorResponse(res, 404, "Snippet not found");
    }

    return successResponse(res, 200, null, "Snippet updated successfully");
  } catch (error) {
    console.error("PUT /snippets/:id error:", error.message);
    return errorResponse(res, 500, "Failed to update snippet");
  }
};

// 삭제
const deleteSnippet = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await snippetsService.deleteSnippet(id);

    if (!result) {
      return errorResponse(res, 404, "Snippet not found");
    }

    return successResponse(res, 200, null, "Snippet deleted successfully");
  } catch (error) {
    console.error("DELETE /snippets/:id error:", error.message);
    return errorResponse(res, 500, "Failed to delete snippet");
  }
};

module.exports = {
  getAllSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
};