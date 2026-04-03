import Order from '../models/Order.js';
import Product from '../models/Product.js';

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private (Customer)
const addOrder = async (req, res) => {
    try {
        const { orderItems, farmerId, totalAmount, deliveryAddress, deliveryPincode } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
            return;
        }

        const order = new Order({
            customerId: req.user._id,
            farmerId,
            products: orderItems,
            totalAmount,
            deliveryAddress,
            deliveryPincode
        });

        const createdOrder = await order.save();

        // Update product stock after order
        for (const item of orderItems) {
            const product = await Product.findById(item.product); // Use .product as per schema
            if (product) {
                product.stock -= item.quantity;
                await product.save();
            }
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('addOrder Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid order ID format' });
        }

        const order = await Order.findById(req.params.id)
            .populate('customerId', 'name email')
            .populate('farmerId', 'name email farmName');

        if (order) {
            if (order.customerId._id.toString() !== req.user._id.toString() && order.farmerId._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401).json({ message: 'Not authorized' });
                return;
            }
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('getOrderById Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customerId: req.user._id });
        res.json(orders);
    } catch (error) {
        console.error('getMyOrders Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get farmer's received orders
// @route   GET /api/orders/farmer
// @access  Private (Farmer)
const getFarmerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ farmerId: req.user._id })
            .populate('customerId', 'name email mobile');
        res.json(orders);
    } catch (error) {
        console.error('getFarmerOrders Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Farmer)
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            if (order.farmerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                res.status(401).json({ message: 'Not authorized' });
                return;
            }

            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error('updateOrderStatus Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export {
    addOrder,
    getOrderById,
    getMyOrders,
    getFarmerOrders,
    updateOrderStatus
};
