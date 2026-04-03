import express from 'express';
import { registerUser, loginUser, getUserProfile, getFarmers, getFarmerById, updateUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   GET /api/auth/profile
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/auth/profile
router.put('/profile', protect, updateUserProfile);

// @route   GET /api/auth/farmers
router.get('/farmers', getFarmers);

// @route   GET /api/auth/farmers/:id
router.get('/farmers/:id', getFarmerById);

export default router;
