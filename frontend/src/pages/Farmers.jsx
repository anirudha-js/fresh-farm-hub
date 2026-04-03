import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { MapPin, Sprout, Star, ChevronRight, Loader2, Search } from 'lucide-react';

const Farmers = () => {
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFarmers = async () => {
            try {
                const res = await api.get('/auth/farmers');
                setFarmers(res.data);
            } catch (error) {
                console.error('Error fetching farmers', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFarmers();
    }, []);

    const filteredFarmers = farmers.filter(f => 
        f.farmName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.pincode.includes(searchTerm)
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-primary-600" size={48} />
            <span className="font-bold text-gray-400 font-black tracking-widest uppercase">Finding Farmers...</span>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">Our Rural <span className="text-primary-600">Heroes</span></h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl">
                        Meet the dedicated farmers bringing fresh produce directly to your neighborhood. 
                        Transparency starts with knowing who grows your food.
                    </p>
                </div>
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by farm, name or pincode..." 
                        className="input pl-12 h-12 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFarmers.map((farmer) => (
                    <Link 
                        key={farmer._id} 
                        to={`/farmers/${farmer._id}`}
                        className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xl shadow-primary-900/5 hover:shadow-primary-900/10 hover:-translate-y-1 transition-all"
                    >
                        <div className="h-48 relative overflow-hidden bg-primary-900 border-b border-gray-100">
                            <img 
                                src={farmer.profileImage || `https://images.unsplash.com/photo-1592982537447-6f2a6a0c3c1e?q=80&w=1780&auto=format&fit=crop`} 
                                alt={farmer.farmName} 
                                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-xs font-black text-gray-900">{farmer.rating || '4.8'}</span>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                                    {farmer.farmingMethod || 'Organic'}
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-8 space-y-6">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">
                                    {farmer.farmName || `${farmer.name}'s Farm`}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-500 font-bold text-sm mt-1">
                                    <MapPin size={16} className="text-primary-600" />
                                    <span>Pincode: {farmer.pincode}</span>
                                </div>
                            </div>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 font-black text-xs overflow-hidden border border-primary-100 shadow-inner">
                                        {farmer.profileImage ? (
                                            <img src={farmer.profileImage} alt={farmer.name} className="w-full h-full object-cover" />
                                        ) : (
                                            farmer.name.split(' ').map(n => n[0]).join('')
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-gray-900">{farmer.name}</span>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lead Farmer</span>
                                    </div>
                                </div>
                                <div className="text-primary-600 bg-primary-50 p-2 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredFarmers.length === 0 && (
                <div className="text-center py-20 space-y-4">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-300">
                        <Sprout size={40} />
                    </div>
                    <p className="text-xl font-bold text-gray-400 tracking-tight">No farmers found in this location.</p>
                </div>
            )}
        </div>
    );
};

export default Farmers;
