const languagesService = require("../services/languagesService");
const { successResponse, errorResponse } = require("../utils/response");

const getAllLanguages = async (req, res) => {
  try {
    const languages = await languagesService.getAllLanguages();
    return successResponse(res, "Languages fetched successfully", languages);
  } catch (error) {
    return errorResponse(res, "Failed to fetch languages");
  }
};

const createLanguage = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return errorResponse(res, "Language name is required", 400);
    }

    const newLanguage = await languagesService.createLanguage(name.trim());
    return successResponse(res, "Language created successfully", newLanguage, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to create language");
  }
};

const deleteLanguage = async (req, res) => {
  try {
    const languageId = req.params.id;

    const result = await languagesService.deleteLanguage(languageId);

    if (!result) {
      return errorResponse(res, "Language not found", 404);
    }

    return successResponse(res, "Language deleted successfully", result);
  } catch (error) {
    return errorResponse(res, error.message || "Failed to delete language", 400);
  }
};

module.exports = {
  getAllLanguages,
  createLanguage,
  deleteLanguage,
};