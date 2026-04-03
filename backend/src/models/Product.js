import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    unit: {
        type: String, // e.g. kg, piece, bunch
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        enum: ['vegetables', 'fruits'],
        required: true
    },
    harvestTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
