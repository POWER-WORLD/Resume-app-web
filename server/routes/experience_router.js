const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experience_controller");
const validateExperience = require("../middlewares/validate_experience");
const { authenticate } = require("../middlewares/auth_middleware");

// Routes - all routes require authentication
router.post("/", authenticate, validateExperience, experienceController.createExperience);
router.get("/", authenticate, experienceController.getExperiences);
router.get("/:id", authenticate, experienceController.getExperienceById);
router.put("/:id", authenticate, validateExperience, experienceController.updateExperience);
router.delete("/:id", authenticate, experienceController.deleteExperience);

module.exports = router;

