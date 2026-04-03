import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, MapPin, Loader2, ArrowRight, Home as HomeIcon, Sprout, Eye, EyeOff, Phone } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import ImageUpload from '../components/ImageUpload';

const Register = () => {
    const location = useLocation();
    const queryRole = new URLSearchParams(location.search).get('role') || 'customer';
    
    const [role, setRole] = useState(queryRole);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        address: '',
        pincode: '',
        farmName: '',
        farmingMethod: 'Organic',
        profileImage: '',
        farmImage: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Ensure role is part of the registration payload
        const registrationData = { ...formData, role };

        try {
            await register(registrationData);
            navigate('/');
        } catch (err) {
            setError(err || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-gray-50 py-12">
            <div className="w-full max-w-2xl space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Join FreshFarm <span className="text-primary-600">Hub</span></h2>
                    <p className="text-gray-500 font-medium tracking-tight">Create your account to start buying or selling</p>
                </div>

                {/* Role Switcher */}
                <div className="flex p-1 bg-gray-100 rounded-2xl">
                    <button 
                        onClick={() => setRole('customer')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${role === 'customer' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <User size={18} /> Customer
                    </button>
                    <button 
                        onClick={() => setRole('farmer')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${role === 'farmer' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Sprout size={18} /> Farmer
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center pb-4">
                        <ImageUpload 
                            label="Set Profile Picture" 
                            value={formData.profileImage} 
                            onChange={(base64) => setFormData({...formData, profileImage: base64})} 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <input
                                name="name"
                                placeholder="Full Name"
                                className="input pl-12 h-12"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    className="input pl-12 h-12"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    name="mobile"
                                    type="tel"
                                    placeholder="10-digit number"
                                    className="input pl-12 h-12"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="input pl-12 pr-12 h-12"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-gray-400 hover:text-primary-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Pincode</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                <input
                                    name="pincode"
                                    placeholder="e.g. 560001"
                                    className="input pl-12 h-12"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Full Address</label>
                        <div className="relative">
                            <HomeIcon className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <input
                                name="address"
                                placeholder="Your complete address"
                                className="input pl-12 h-12"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {role === 'farmer' && (
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <div className="space-y-2">
                            <ImageUpload 
                                label="Farm / Brand Identity Image" 
                                value={formData.farmImage} 
                                onChange={(base64) => setFormData({...formData, farmImage: base64})} 
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Farm Name</label>
                                <div className="relative">
                                    <Sprout className="absolute left-4 top-3.5 text-gray-400" size={18} />
                                    <input
                                        name="farmName"
                                        placeholder="Gokul Farms"
                                        className="input pl-12 h-12"
                                        value={formData.farmName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Farming Method</label>
                                <select 
                                    name="farmingMethod"
                                    className="input h-12"
                                    value={formData.farmingMethod}
                                    onChange={handleChange}
                                >
                                    <option value="Organic">Organic</option>
                                    <option value="Natural">Natural Farming</option>
                                    <option value="Traditional">Traditional</option>
                                    <option value="Hydroponic">Hydroponic</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full h-12 text-lg font-bold group"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : (
                            <>
                                Create {role === 'farmer' ? 'Farmer' : 'Customer'} Account
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="pt-6 border-t border-gray-50 text-center">
                    <p className="text-sm text-gray-500 font-medium">
                        Already have an account? <Link to="/login" className="text-primary-600 font-black hover:text-primary-700">Sign In instead</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
