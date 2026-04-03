import express from 'express';
import {
    addOrder,
    getOrderById,
    getMyOrders,
    getFarmerOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import { protect, farmerRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/orders
router.post('/', protect, addOrder);

// @route   GET /api/orders/myorders
router.get('/myorders', protect, getMyOrders);

// @route   GET /api/orders/farmer
router.get('/farmer', protect, farmerRole, getFarmerOrders);

// @route   GET /api/orders/:id
router.get('/:id', protect, getOrderById);

// @route   PUT /api/orders/:id/status
router.put('/:id/status', protect, farmerRole, updateOrderStatus);

export default router;
