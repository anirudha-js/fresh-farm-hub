import React, { useState, useContext } from 'react';
import { ShoppingCart, Star, Clock, MapPin, Plus, ExternalLink, Leaf } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import ProductDetailsModal from './ProductDetailsModal';

const ProductCard = ({ product }) => {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    return (
        <>
            <div 
                className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer"
                onClick={() => setIsDetailModalOpen(true)}
            >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                    <img 
                        src={product.image || `https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=1770&auto=format&fit=crop`} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-sm border border-primary-100">
                            {product.category}
                        </span>
                        {product.stock < 10 && (
                            <span className="bg-red-500/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm">
                                Low Stock
                            </span>
                        )}
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 bg-primary-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white p-3 rounded-full text-primary-600 shadow-xl border border-white/50 scale-90 group-hover:scale-100 transition-transform">
                            <Plus size={24} />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div className="flex justify-between items-start gap-2">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight group-hover:text-primary-600 transition-colors uppercase">{product.name}</h3>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                                <Clock size={12} /> Harvested {new Date(product.harvestTime).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-black text-gray-900 leading-tight">₹{product.price}</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">per {product.unit}</span>
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm font-medium line-clamp-2 leading-relaxed h-10">
                        {product.description || "Freshly harvested produce, directly from local farms. Organic, healthy, and delicious."}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50 mt-auto">
                        <div className="flex items-center gap-1.5">
                            <div className="bg-emerald-50 p-1.5 rounded-lg text-emerald-600">
                                <Leaf size={14} />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Natural Farmed</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-black text-yellow-500">
                            <Star size={14} fill="currentColor" /> 4.8
                        </div>
                    </div>

                    {/* Bottom Action - Only for customers */}
                    {user?.role !== 'farmer' && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="w-full h-12 bg-gray-50 group-hover:bg-primary-600 text-gray-600 group-hover:text-white rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest transition-all shadow-sm border border-transparent hover:shadow-xl hover:shadow-primary-900/10 active:scale-95"
                        >
                            <ShoppingCart size={18} />
                            Add To Bag
                        </button>
                    )}
                    {user?.role === 'farmer' && (
                        <div className="w-full h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest border border-dashed border-gray-200">
                            Seller Account (View Only)
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <ProductDetailsModal 
                isOpen={isDetailModalOpen} 
                onClose={() => setIsDetailModalOpen(false)} 
                product={product} 
            />
        </>
    );
};

export default ProductCard;
