import express from 'express';
import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getFarmerProducts
} from '../controllers/productController.js';
import { protect, farmerRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/products
router.get('/', getProducts);

// @route   GET /api/products/farmer
router.get('/farmer', protect, farmerRole, getFarmerProducts);

// @route   POST /api/products
router.post('/', protect, farmerRole, addProduct);

// @route   PUT /api/products/:id
router.put('/:id', protect, farmerRole, updateProduct);

// @route   DELETE /api/products/:id
router.delete('/:id', protect, farmerRole, deleteProduct);

// @route   GET /api/products/:id
router.get('/:id', getProductById);

export default router;
