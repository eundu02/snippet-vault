const languagesService = require("../services/languagesService");
const { successResponse, errorResponse } = require("../utils/response");

const getAllLanguages = async (req, res) => {
  try {
    const languages = await languagesService.getAllLanguages();
    return successResponse(res, "Languages fetched successfully", languages);
  } catch (error) {
    console.error("GET /languages error:", error.message);
    return errorResponse(res, "Failed to fetch languages", 500);
  }
};

module.exports = {
  getAllLanguages,
};