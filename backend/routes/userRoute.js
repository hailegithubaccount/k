const express = require('express');
const authController = require('../controller/authController');
const { protect, isAdmin } = require('../middleware/auth');  // ✅ Import protect & isAdmin

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Admin-only route to register staff
router.post("/admin/register-staff", protect, isAdmin, authController.registerLibraryStaff);

// Get all users (only accessible by authenticated users)
router.get('/', protect, authController.getAllUser);

module.exports = router;
