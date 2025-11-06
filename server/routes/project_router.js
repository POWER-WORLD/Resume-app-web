const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project_controller");
const validateProject = require("../middlewares/validate_project");
const { authenticate } = require("../middlewares/auth_middleware");

// CRUD routes - all routes require authentication
router.post("/", authenticate, validateProject, projectController.createProject);
router.get("/", authenticate, projectController.getProjects);
router.get("/:id", authenticate, projectController.getProjectById);
router.put("/:id", authenticate, validateProject, projectController.updateProject);
router.delete("/:id", authenticate, projectController.deleteProject);

module.exports = router;