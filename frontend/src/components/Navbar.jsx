import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Leaf, LogOut, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import ProfileModal from './ProfileModal';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary-600 p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
                            <Leaf size={24} fill="currentColor" />
                        </div>
                        <span className="text-2xl font-black text-gray-900 tracking-tight">
                            FreshFarm <span className="text-primary-600">Hub</span>
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
                        <Link to="/products" className="hover:text-primary-600 transition-colors">Products</Link>
                        <Link to="/farmers" className="hover:text-primary-600 transition-colors">Farmers Hub</Link>
                        <Link to="/" className="hover:text-primary-600 transition-colors">About Us</Link>
                    </div>

                    {/* Auth & Other Links */}
                    <div className="flex items-center gap-1">
                        {user?.role !== 'farmer' && (
                            <Link to="/cart" className="relative p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all">
                                <ShoppingCart size={22} />
                                {cartItems.length > 0 && (
                                    <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in duration-300">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        )}
                        
                        {user ? (
                            <div className="flex items-center gap-4 border-l pl-4 border-gray-200">
                                <div 
                                    onClick={() => setIsProfileModalOpen(true)}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div className="w-10 h-10 rounded-full border-2 border-primary-100 overflow-hidden bg-gray-50 flex-shrink-0 group-hover:border-primary-600 transition-colors">
                                        {user.profileImage ? (
                                            <img 
                                                src={user.profileImage} 
                                                alt={user.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-primary-600 bg-primary-50 font-black text-xs">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-start group-hover:text-primary-600 transition-colors">
                                        <span className="text-xs font-bold text-gray-900 group-hover:text-primary-600">{user.name}</span>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">{user.role}</span>
                                    </div>
                                </div>
                                {user.role === 'farmer' && (
                                    <Link to="/dashboard" className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                                        <LayoutDashboard size={22} />
                                    </Link>
                                )}
                                <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-1">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-gray-600 font-semibold px-4 py-2 hover:text-primary-600 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary">
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ProfileModal 
                isOpen={isProfileModalOpen} 
                onClose={() => setIsProfileModalOpen(false)} 
            />
        </nav>
    );
};

export default Navbar;
