import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        name: String,
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryAddress: String,
    deliveryPincode: String,
    paymentResult: {
        id: String,
        status: String,
        updateTime: String,
        emailAddress: String
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
