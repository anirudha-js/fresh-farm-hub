import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, MapPin, Clock, ArrowRight, Package, CreditCard, ShieldCheck } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Cart = () => {
    const { cartItems, addToCart, removeFromCart, deleteFromCart, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => {
        if (user?.role === 'farmer') {
            navigate('/');
        }
    }, [user, navigate]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const tax = subtotal * 0.05; // 5% GST
    const delivery = subtotal > 500 ? 0 : 40;
    const total = subtotal + tax + delivery;

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login?redirect=cart');
            return;
        }

        setIsCheckingOut(true);
        try {
            // Group products by farmer
            const farmerId = cartItems[0]?.farmerId?._id || cartItems[0]?.farmerId;
            
            await api.post('/orders', {
                orderItems: cartItems.map(item => ({
                    name: item.name,
                    quantity: item.qty,
                    price: item.price,
                    product: item._id
                })),
                deliveryAddress: user.address,
                deliveryPincode: user.pincode,
                totalAmount: total,
                farmerId: farmerId 
            });

            alert('Order placed successfully! The farmer will be notified.');
            clearCart();
            navigate('/');
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Checkout failed. Please try again.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Cart Items List */}
                    <div className="flex-[2] space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <ShoppingCart size={32} className="text-primary-600" />
                                Your Harvest Cart
                            </h1>
                            <p className="text-gray-500 font-medium ml-1">Support local farmers, eat fresh, live healthy.</p>
                        </div>

                        {cartItems.length > 0 ? (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow">
                                        <div className="w-24 h-24 bg-primary-50 rounded-2xl overflow-hidden shadow-inner border border-primary-100/50">
                                            <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-1 text-center sm:text-left">
                                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">{item.name}</h3>
                                            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                <span className="text-primary-600">₹{item.price} / {item.unit}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><Package size={12} /> {item.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100/50">
                                            <button onClick={() => removeFromCart(item)} className="p-2 hover:bg-white rounded-lg text-gray-500 hover:text-primary-600 transition-all"><Minus size={16} /></button>
                                            <span className="w-10 text-center font-black text-gray-900">{item.qty}</span>
                                            <button onClick={() => addToCart(item)} className="p-2 hover:bg-white rounded-lg text-gray-500 hover:text-primary-600 transition-all"><Plus size={16} /></button>
                                        </div>
                                        <div className="text-right min-w-[100px] flex flex-col items-end">
                                            <span className="text-xl font-black text-gray-900">₹{item.price * item.qty}</span>
                                            <button onClick={() => deleteFromCart(item._id)} className="text-xs font-bold text-red-500 hover:text-red-700 mt-1 uppercase tracking-widest">Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-20 rounded-[3rem] shadow-sm border border-gray-100 text-center space-y-6">
                                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                    <ShoppingCart size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Your cart is empty</h3>
                                <p className="text-gray-500 font-medium">Add some fresh farm produce to get started!</p>
                                <Link to="/products" className="btn btn-primary px-8 h-12 inline-flex">Explore Harvest</Link>
                            </div>
                        )}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="flex-1">
                        <div className="bg-white p-8 rounded-[3rem] shadow-xl shadow-primary-900/5 border border-gray-100 sticky top-32 space-y-8">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span className="uppercase tracking-widest">Subtotal</span>
                                    <span className="text-gray-900">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span className="uppercase tracking-widest">Tax (5% GST)</span>
                                    <span className="text-gray-900">₹{tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span className="uppercase tracking-widest">Delivery</span>
                                    <span className="text-gray-900">{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-50 flex justify-between">
                                    <span className="text-lg font-black text-gray-900 uppercase tracking-tight">Total</span>
                                    <span className="text-2xl font-black text-primary-600">₹{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                                    <ShieldCheck className="text-emerald-600" size={20} />
                                    <span className="text-xs font-bold text-emerald-800 tracking-wide">Secure Farm-to-Table Transaction</span>
                                </div>
                                <button 
                                    onClick={handleCheckout}
                                    disabled={cartItems.length === 0 || isCheckingOut}
                                    className="btn btn-primary w-full h-16 text-lg font-black shadow-xl shadow-primary-900/20 group active:scale-95 transition-all text-white"
                                >
                                    {isCheckingOut ? (
                                        <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Processing...</div>
                                    ) : <>Confirm Order <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                                <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">Cash on Delivery Available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
