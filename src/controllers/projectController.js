const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/** CREATE PROJECT */
const createProject = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const userId = req.user.userId; // Authenticated user ID

        const project = await prisma.project.create({
            data: { name, description, status, userId },
        });

        res.status(201).json({ message: "Project created successfully", project });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** GET ALL PROJECTS */
const getAllProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            include: { user: { select: { name: true, email: true } } },
        });

        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** UPDATE PROJECT */
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status } = req.body;
        const userId = req.user.userId;

        // Check if project belongs to user
        const project = await prisma.project.findUnique({ where: { id } });
        if (!project || project.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized to update this project" });
        }

        const updatedProject = await prisma.project.update({
            where: { id },
            data: { name, description, status },
        });

        res.json({ message: "Project updated successfully", updatedProject });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/** DELETE PROJECT */
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // Check if project belongs to user
        const project = await prisma.project.findUnique({ where: { id } });
        if (!project || project.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this project" });
        }

        await prisma.project.delete({ where: { id } });

        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createProject, getAllProjects, updateProject, deleteProject };