import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get all products (with optional filter by pincode and category)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const { pincode, category, farmerId } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        if (farmerId) {
            query.farmerId = farmerId;
        }

        if (pincode) {
            // Find farmers in that pincode
            const farmers = await User.find({ pincode, role: 'farmer' }).select('_id');
            const farmerIds = farmers.map(f => f._id);
            query.farmerId = { ...query.farmerId, $in: farmerIds };
        }

        const products = await Product.find(query).populate('farmerId', 'name address pincode farmName');
        res.json(products);
    } catch (error) {
        console.error('getProducts Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        // Basic check if it's a valid ObjectId to prevent CastError before we even try
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid product ID format' });
        }

        const product = await Product.findById(req.params.id).populate('farmerId', 'name address pincode farmName');

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('getProductById Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a product (Farmer only)
// @route   POST /api/products
// @access  Private/Farmer
const addProduct = async (req, res) => {
    try {
        const { name, description, price, unit, stock, category, harvestTime, image } = req.body;

        const product = new Product({
            farmerId: req.user._id,
            name,
            description,
            price,
            unit,
            stock,
            category,
            harvestTime,
            image
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('addProduct Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product (Farmer only)
// @route   PUT /api/products/:id
// @access  Private/Farmer
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, unit, stock, category, harvestTime, image } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            if (product.farmerId.toString() !== req.user._id.toString()) {
                res.status(401).json({ message: 'Not authorized to update this product' });
                return;
            }

            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price !== undefined ? price : product.price;
            product.unit = unit || product.unit;
            product.stock = stock !== undefined ? stock : product.stock;
            product.category = category || product.category;
            product.harvestTime = harvestTime || product.harvestTime;
            product.image = image || product.image;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('updateProduct Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product (Farmer only)
// @route   DELETE /api/products/:id
// @access  Private/Farmer
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            if (product.farmerId.toString() !== req.user._id.toString()) {
                res.status(401).json({ message: 'Not authorized to delete this product' });
                return;
            }

            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('deleteProduct Error:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all products from a specific farmer
// @route   GET /api/products/farmer
// @access  Private/Farmer
const getFarmerProducts = async (req, res) => {
    try {
        const products = await Product.find({ farmerId: req.user._id });
        res.json(products);
    } catch (error) {
        console.error('getFarmerProducts Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getFarmerProducts
};
