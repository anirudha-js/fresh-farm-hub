import React, { useContext, useEffect } from 'react';
import { ShoppingCart, Star, Clock, MapPin, X, ShieldCheck, Leaf, Info } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import Modal from './Modal';

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);

    if (!product) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Produce Details">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Image Section */}
                <div className="flex-1 space-y-4">
                    <div className="relative w-full h-[320px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                        <img 
                            src={product.image || `https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1770&auto=format&fit=crop`} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-sm border border-primary-100">
                            {product.category}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <div className="bg-emerald-600 p-2 rounded-xl text-white">
                            <Leaf size={16} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-emerald-900 uppercase tracking-widest">Grown with Care</p>
                            <p className="text-[10px] font-bold text-emerald-600">No harmful pesticides used</p>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{product.name}</h3>
                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                                <div className="flex items-center gap-1.5"><Clock size={14} /> Harvested on {new Date(product.harvestTime).toLocaleDateString()}</div>
                                <div className="flex items-center gap-1.5 text-yellow-500"><Star size={14} fill="currentColor" /> 4.8 Rating</div>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-primary-600">₹{product.price}</span>
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">per {product.unit}</span>
                        </div>

                        <p className="text-gray-500 font-medium text-sm leading-relaxed">
                            {product.description || "Our farm-fresh produce is harvested at the peak of ripeness to ensure maximum flavor and nutritional value. Directly from our fields to your table."}
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Available</p>
                                <p className="text-sm font-black text-gray-900">{product.stock} {product.unit}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Farmer</p>
                                <p className="text-sm font-black text-primary-600">{product.farmerId?.farmName || "Fresh Farm Hub"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 italic">
                            <ShieldCheck size={14} className="text-emerald-500" />
                            100% Quality Assurance from Fresh Farm Hub
                        </div>
                        {user?.role !== 'farmer' ? (
                            <button 
                                onClick={() => {
                                    addToCart(product);
                                    onClose();
                                }}
                                className="btn btn-primary w-full h-14 font-bold text-white shadow-xl shadow-primary-900/10 group active:scale-95 transition-all"
                            >
                                Add to Harvest Cart
                                <ShoppingCart size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <div className="w-full h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest border border-dashed border-gray-200">
                                Seller Account (View Only)
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProductDetailsModal;
