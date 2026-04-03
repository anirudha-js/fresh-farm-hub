import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, MapPin, Truck, Leaf, Loader2 } from 'lucide-react';

const ProductList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category') || '';

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pincode, setPincode] = useState('');
    const [category, setCategory] = useState(initialCategory);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/products`, {
                params: { pincode, category }
            });
            setProducts(data);
        } catch (err) {
            setError('Failed to fetch products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [category]); // Re-fetch when category is changed from Home page

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            {/* Header Section */}
            <div className="bg-primary-900 rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="relative z-10 space-y-4 max-w-xl">
                    <h1 className="text-4xl font-black tracking-tight">Nearby Farm Products</h1>
                    <p className="text-primary-100 font-medium">Discover fresh vegetables and fruits harvested just for you. Filter by your location to see what's available nearby.</p>
                </div>
                {/* Decorative icons */}
                <Leaf className="absolute -bottom-10 -right-10 w-64 h-64 text-primary-800 opacity-50 -rotate-45" />
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <form onSubmit={handleSearch} className="flex-1 flex gap-3 w-full">
                    <div className="relative flex-1">
                        <MapPin className="absolute left-4 top-3.5 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Enter your Pincode (e.g. 560001)" 
                            className="input pl-12 h-12"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary px-8 h-12">
                        <Search size={18} className="mr-2" />
                        Find Nearby
                    </button>
                </form>

                <div className="flex gap-2 w-full md:w-auto">
                    {['', 'vegetables', 'fruits'].map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${category === cat ? 'bg-primary-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                            {cat || 'All Items'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-4">
                    <Loader2 className="animate-spin text-primary-600" size={48} />
                    <span className="font-bold text-gray-400">Harvesting the list...</span>
                </div>
            ) : error ? (
                <div className="text-center py-40">
                    <p className="text-red-500 font-bold">{error}</p>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} onAddToCart={() => alert('Added to cart mock')} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-40 space-y-6">
                    <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-gray-300">
                        <Search size={40} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-gray-900 tracking-tight">No products found</h3>
                        <p className="text-gray-500 font-medium max-w-sm mx-auto">Try searching a different pincode or browse all categories.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
