const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// CREATE TASK
const createTask = async (req, res) => {
    try {
        const { title, description, status, assignedUserId } = req.body;
        const { projectId } = req.params;
        const userId = req.user.userId;

        const project = await prisma.project.findUnique({ where: { id: projectId } });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const task = await prisma.task.create({
            data: { title, description, status, projectId, assignedUserId },
        });

        res.status(201).json({ message: "Task created successfully", task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET TASKS FOR A PROJECT
const getProjectTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { status, assignedUserId } = req.query;

        const tasks = await prisma.task.findMany({
            where: {
                projectId,
                status: status ? status : undefined,
                assignedUserId: assignedUserId ? assignedUserId : undefined,
            },
            include: { assignedUser: { select: { name: true, email: true } } },
        });

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE TASK
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, assignedUserId } = req.body;
        const userId = req.user.userId;

        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await prisma.project.findUnique({ where: { id: task.projectId } });
        if (task.assignedUserId !== userId && project.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized to update this task" });
        }

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { title, description, status, assignedUserId },
        });

        res.json({ message: "Task updated successfully", updatedTask });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const project = await prisma.project.findUnique({ where: { id: task.projectId } });
        if (task.assignedUserId !== userId && project.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this task" });
        }

        await prisma.task.delete({ where: { id } });

        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createTask, getProjectTasks, updateTask, deleteTask };