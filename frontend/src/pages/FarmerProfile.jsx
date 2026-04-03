import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { MapPin, Sprout, Star, Phone, Mail, Loader2, ChevronLeft, LayoutGrid, Leaf } from 'lucide-react';

const FarmerProfile = () => {
    const { id } = useParams();
    const [farmer, setFarmer] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFarmerAndProducts = async () => {
            try {
                const [farmerRes, productsRes] = await Promise.all([
                    api.get(`/auth/farmers/${id}`),
                    api.get(`/products?farmerId=${id}`)
                ]);
                setFarmer(farmerRes.data);
                setProducts(productsRes.data);
            } catch (error) {
                console.error('Error fetching farmer profile', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFarmerAndProducts();
    }, [id]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-primary-600" size={48} />
            <span className="font-bold text-gray-400 font-black tracking-widest uppercase">Opening Farm Gates...</span>
        </div>
    );

    if (!farmer) return (
        <div className="text-center py-40 space-y-6">
            <h2 className="text-3xl font-black text-gray-900">Farmer not found</h2>
            <Link to="/farmers" className="btn btn-primary px-8">Back to All Farmers</Link>
        </div>
    );

    const categories = {
        vegetables: products.filter(p => p.category === 'vegetables'),
        fruits: products.filter(p => p.category === 'fruits')
    };

    return (
        <div className="pb-20">
            {/* Profile Header */}
            <header className="relative bg-primary-900 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={`https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1780&auto=format&fit=crop`} 
                        alt={farmer.farmName} 
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 to-primary-900"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 space-y-8">
                    <Link to="/farmers" className="inline-flex items-center gap-2 text-primary-400 font-bold hover:text-white transition-colors">
                        <ChevronLeft size={20} /> Back to Farmers
                    </Link>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-primary-500 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform opacity-20"></div>
                            <div className="w-48 h-48 bg-white p-2 rounded-3xl relative z-10 shadow-2xl overflow-hidden">
                                <img 
                                    src={farmer.profileImage || `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop`} 
                                    alt={farmer.name} 
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div className="space-y-1">
                                <span className="text-primary-400 text-xs font-black uppercase tracking-widest bg-primary-400/10 px-3 py-1 rounded-lg border border-primary-400/20">
                                    Trusted Farmer
                                </span>
                                <h1 className="text-5xl font-black text-white tracking-tight pt-2 uppercase underline decoration-primary-500 decoration-8 underline-offset-8">
                                    {farmer.farmName || `${farmer.name}'s Farm`}
                                </h1>
                            </div>
                            
                            <p className="text-xl text-gray-300 font-medium max-w-2xl italic leading-relaxed">
                                {farmer.farmingMethod === 'Hydroponic' ? '"Innovating agriculture with water and wisdom, bringing tech-fresh harvests to you."' : '"Our mission is to bring the ancestral purity of farming back to your modern table, one harvest at a time."'}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-primary-200">
                                <div className="flex items-center gap-2"><MapPin size={18} /> {farmer.pincode}, {farmer.address}</div>
                                <div className="flex items-center gap-2 text-yellow-400"><Star size={18} fill="currentColor" /> {farmer.rating || '4.8'} (24 Reviews)</div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 space-y-6 min-w-[280px]">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-white">
                                    <Mail size={18} className="text-primary-400" />
                                    <span className="text-sm font-bold">{farmer.email}</span>
                                </div>
                                <div className="flex items-center gap-4 text-white">
                                    <Phone size={18} className="text-primary-400" />
                                    <span className="text-sm font-bold">+91 {farmer.mobile || '98765 43210'}</span>
                                </div>
                                <div className="flex items-center gap-4 text-white">
                                    <Sprout size={18} className="text-primary-400" />
                                    <span className="text-sm font-bold">{farmer.farmingMethod || 'Organic'} Specialist</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Products Grid Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
                <div className="space-y-20">
                    {/* Categories Tabs/Display */}
                    {Object.entries(categories).map(([cat, items]) => (
                        <section key={cat} className="space-y-8">
                            {items.length > 0 && (
                                <>
                                    <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                                        <div className="bg-primary-600 p-3 rounded-2xl text-white shadow-lg">
                                            {cat === 'vegetables' ? <LayoutGrid size={24} /> : <Leaf size={24} />}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-gray-900 tracking-tight capitalize">Available {cat}</h2>
                                            <p className="text-gray-500 font-medium text-sm">Harvested directly from our fields</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                        {items.map(product => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </section>
                    ))}

                    {products.length === 0 && (
                        <div className="bg-white p-20 rounded-3xl shadow-xl text-center space-y-6">
                            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                <Sprout size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900">No products listed currently</h3>
                            <p className="text-gray-500 font-medium">Check back soon for the next harvest season!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default FarmerProfile;
