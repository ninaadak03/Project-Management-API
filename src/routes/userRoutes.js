const express = require("express");
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", authMiddleware, getAllUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;