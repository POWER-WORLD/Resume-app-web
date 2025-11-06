const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill_controller");
const validateSkill = require("../middlewares/validate_skill");
const { authenticate } = require("../middlewares/auth_middleware");

// Routes - all routes require authentication
router.post("/", authenticate, validateSkill, skillController.createSkill);
router.get("/", authenticate, skillController.getSkills);
router.get("/:id", authenticate, skillController.getSkillById);
router.put("/:id", authenticate, validateSkill, skillController.updateSkill);
router.delete("/:id", authenticate, skillController.deleteSkill);

module.exports = router;
