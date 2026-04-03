import React, { useState, useEffect, useContext } from 'react';
import { User, Mail, Phone, MapPin, Home, Sprout, Loader2, Save, X } from 'lucide-react';
import Modal from './Modal';
import ImageUpload from './ImageUpload';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        mobile: user?.mobile || '',
        address: user?.address || '',
        pincode: user?.pincode || '',
        farmName: user?.farmName || '',
        farmingMethod: user?.farmingMethod || 'Organic',
        profileImage: user?.profileImage || '',
        farmImage: user?.farmImage || ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                mobile: user.mobile || '',
                address: user.address || '',
                pincode: user.pincode || '',
                farmName: user.farmName || '',
                farmingMethod: user.farmingMethod || 'Organic',
                profileImage: user.profileImage || '',
                farmImage: user.farmImage || ''
            });
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsSubmitting(true);

        try {
            const { data } = await api.put('/auth/profile', formData);
            updateUser(data);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onClose();
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsSubmitting(true);
            // Simulate a smoother transition
            setTimeout(() => setIsSubmitting(false), 500);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Your Profile">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Section */}
                <div className={`grid gap-8 ${user?.role === 'farmer' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                    <div className="flex flex-col items-center gap-4">
                        <ImageUpload 
                            label="Personal Profile Picture" 
                            value={formData.profileImage} 
                            onChange={(base64) => setFormData({...formData, profileImage: base64})} 
                        />
                    </div>
                    {user?.role === 'farmer' && (
                        <div className="flex flex-col items-center gap-4">
                            <ImageUpload 
                                label="Farm / Brand Identity" 
                                value={formData.farmImage} 
                                onChange={(base64) => setFormData({...formData, farmImage: base64})} 
                            />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <User size={14} className="text-primary-600" /> Full Name
                        </label>
                        <input name="name" className="input" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Mail size={14} className="text-primary-600" /> Email Address
                        </label>
                        <input className="input bg-gray-50 opacity-60 cursor-not-allowed" value={formData.email} disabled />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Phone size={14} className="text-primary-600" /> Mobile Number
                        </label>
                        <input name="mobile" className="input" value={formData.mobile} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <MapPin size={14} className="text-primary-600" /> Pincode
                        </label>
                        <input name="pincode" className="input" value={formData.pincode} onChange={handleChange} required />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Home size={14} className="text-primary-600" /> Full Address
                    </label>
                    <input name="address" className="input" value={formData.address} onChange={handleChange} required />
                </div>

                {user?.role === 'farmer' && (
                    <div className="pt-6 border-t border-gray-100 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Sprout size={14} className="text-primary-600" /> Farm Name
                                </label>
                                <input name="farmName" className="input" value={formData.farmName} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 font-bold">Farming Method</label>
                                <select 
                                    name="farmingMethod" 
                                    className="input" 
                                    value={formData.farmingMethod} 
                                    onChange={handleChange}
                                >
                                    <option value="Organic">Organic</option>
                                    <option value="Natural Farming">Natural Farming</option>
                                    <option value="Traditional">Traditional</option>
                                    <option value="Hydroponic">Hydroponic</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-bold border border-green-100 text-center animate-in zoom-in duration-300">
                        Profile Updated Successfully! 🎉
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn btn-primary w-full h-14 text-white font-bold shadow-xl shadow-primary-900/10 text-lg relative overflow-hidden group"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : (
                        <div className="flex items-center justify-center gap-2">
                            <Save size={20} />
                            Save Changes
                        </div>
                    )}
                </button>
            </form>
        </Modal>
    );
};

export default ProfileModal;
