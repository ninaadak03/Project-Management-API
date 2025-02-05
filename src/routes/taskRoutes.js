const express = require("express");
const { createTask, getProjectTasks, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/projects/:projectId/tasks", authMiddleware, createTask);
router.get("/projects/:projectId/tasks", authMiddleware, getProjectTasks);
router.put("/tasks/:id", authMiddleware, updateTask);
router.delete("/tasks/:id", authMiddleware, deleteTask);

module.exports = router;