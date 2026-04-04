const languagesService = require("../services/languagesService");
const { successResponse, errorResponse } = require("../utils/response");

const getAllLanguages = async (req, res) => {
  try {
    const languages = await languagesService.getAllLanguages();

    return successResponse(
      res,
      200,
      languages,
      "Languages fetched successfully"
    );
  } catch (error) {
    console.error("GET /languages error:", error.message);
    return errorResponse(res, 500, "Failed to fetch languages");
  }
};

module.exports = {
  getAllLanguages,
};