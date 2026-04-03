import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { 
    Plus, Package, ShoppingBag, TrendingUp, Edit, Trash2, 
    CheckCircle, Clock, Loader2, User as UserIcon, MapPin, Mail, Phone, Home 
} from 'lucide-react';
import Modal from '../components/Modal';
import ImageUpload from '../components/ImageUpload';
import ProfileModal from '../components/ProfileModal';

const FarmerDashboard = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('inventory');
    const [orderFilter, setOrderFilter] = useState('all');
    
    // Modals state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        unit: 'kg',
        stock: '',
        category: 'vegetables',
        harvestTime: new Date().toISOString().slice(0, 16),
        image: ''
    });

    const openProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const [productsRes, ordersRes, profileRes] = await Promise.all([
                api.get('/products/farmer'),
                api.get('/orders/farmer'),
                api.get('/auth/profile')
            ]);
            setProducts(productsRes.data);
            setOrders(ordersRes.data);
            if (profileRes.data) {
                updateUser(profileRes.data); // Synchronize full profile (mobile, address, etc.)
            }
        } catch (error) {
            console.error('Error fetching dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const resetForm = () => {
        setFormData({
            name: '', description: '', price: '', unit: 'kg', 
            stock: '', category: 'vegetables', harvestTime: new Date().toISOString().slice(0, 16), image: ''
        });
        setEditingProduct(null);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', formData);
            setIsAddModalOpen(false);
            fetchData();
            resetForm();
        } catch (error) {
            console.error('Failed to add product', error);
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/${editingProduct._id}`, formData);
            setIsEditModalOpen(false);
            fetchData();
            resetForm();
        } catch (error) {
            console.error('Failed to update product', error);
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            ...product,
            harvestTime: new Date(product.harvestTime).toISOString().slice(0, 16)
        });
        setIsEditModalOpen(true);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchData();
            } catch (error) {
                console.error('Failed to delete product', error);
            }
        }
    };

    const handleUpdateStatus = async (orderId, status) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status });
            fetchData();
        } catch (error) {
            console.error('Failed to update order status', error);
        }
    };

    const filteredOrders = orders.filter(order => {
        if (orderFilter === 'active') return order.status === 'pending' || order.status === 'confirmed' || order.status === 'out_for_delivery';
        if (orderFilter === 'completed') return order.status === 'delivered';
        return true;
    });

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-primary-600" size={48} />
            <span className="font-bold text-gray-400">Loading Dashboard...</span>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Farmer Dashboard</h1>
                    <p className="text-gray-500 font-medium">Welcome back, {user?.name}! Manage your farm produce and orders.</p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={openProfileModal}
                        className="btn bg-white text-gray-900 border border-gray-100 px-6 h-12 shadow-sm hover:shadow-md"
                    >
                        <UserIcon size={18} className="mr-2" /> Edit Farm Profile
                    </button>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="btn btn-primary px-6 h-12 shadow-xl shadow-primary-900/10"
                    >
                        <Plus size={18} className="mr-2" /> Add New Produce
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <button 
                    onClick={() => setActiveTab('inventory')}
                    className={`p-6 rounded-2xl shadow-sm border transition-all text-left ${activeTab === 'inventory' ? 'bg-primary-50 border-primary-200' : 'bg-white border-gray-100 hover:shadow-md'}`}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Package size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Products</p>
                            <p className="text-2xl font-black text-gray-900">{products.length}</p>
                        </div>
                    </div>
                </button>
                <button 
                    onClick={() => { setActiveTab('orders'); setOrderFilter('active'); }}
                    className={`p-6 rounded-2xl shadow-sm border transition-all text-left ${activeTab === 'orders' && orderFilter === 'active' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:shadow-md'}`}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><ShoppingBag size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Orders</p>
                            <p className="text-2xl font-black text-gray-900">{orders.filter(o => o.status !== 'delivered').length}</p>
                        </div>
                    </div>
                </button>
                <button 
                    onClick={() => { setActiveTab('orders'); setOrderFilter('completed'); }}
                    className={`p-6 rounded-2xl shadow-sm border transition-all text-left ${activeTab === 'orders' && orderFilter === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 hover:shadow-md'}`}
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Completed</p>
                            <p className="text-2xl font-black text-gray-900">{orders.filter(o => o.status === 'delivered').length}</p>
                        </div>
                    </div>
                </button>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><TrendingUp size={24} /></div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Revenue</p>
                            <p className="text-2xl font-black text-gray-900">₹{orders.reduce((acc, o) => acc + o.totalAmount, 0)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content Tabs */}
            <div className="space-y-6">
                <div className="flex border-b border-gray-100 gap-8">
                    {['inventory', 'orders'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => { setActiveTab(tab); if (tab === 'orders') setOrderFilter('all'); }}
                            className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-t-full"></div>}
                        </button>
                    ))}
                </div>

                {activeTab === 'inventory' ? (
                    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs font-black uppercase tracking-widest text-gray-500 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-4">Product</th>
                                    <th className="px-8 py-4">Price</th>
                                    <th className="px-8 py-4">Stock</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map(item => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-primary-50 rounded-lg overflow-hidden flex items-center justify-center text-primary-600">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Package size={24} />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900">{item.name}</span>
                                                    <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">{item.category}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-gray-900">₹{item.price}/{item.unit}</td>
                                        <td className="px-8 py-6 uppercase font-black tracking-widest text-xs text-gray-500">{item.stock} {item.unit}</td>
                                        <td className="px-8 py-6 text-right space-x-2">
                                            <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"><Edit size={18} /></button>
                                            <button onClick={() => handleDeleteProduct(item._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.length > 0 ? filteredOrders.map(order => (
                            <div key={order._id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-8 hover:shadow-md transition-shadow">
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-gray-100 px-3 py-1 rounded-lg text-xs font-black text-gray-500 uppercase tracking-widest">#{order._id.slice(-6)}</span>
                                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900">
                                        {order.products.map(p => `${p.quantity}${p.unit || 'kg'} ${p.name}`).join(', ')}
                                    </h3>
                                    <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-500">
                                        <div className="flex items-center gap-2"><UserIcon size={16} className="text-primary-600" /> {order.customerId?.name || 'Customer'}</div>
                                        <div className="flex items-center gap-2"><MapPin size={16} className="text-primary-600" /> {order.deliveryPincode}</div>
                                        <div className="flex items-center gap-2"><Clock size={16} className="text-primary-600" /> {new Date(order.createdAt).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end gap-4 min-w-[200px]">
                                    <span className="text-3xl font-black text-gray-900">₹{order.totalAmount}</span>
                                    <select 
                                        className="input h-10 text-xs font-black uppercase tracking-widest"
                                        value={order.status}
                                        onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="out_for_delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-40 space-y-6">
                                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-gray-300"><ShoppingBag size={40} /></div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">No {orderFilter !== 'all' ? orderFilter : ''} orders found</h3>
                                {orderFilter !== 'all' && <button onClick={() => setOrderFilter('all')} className="text-primary-600 font-bold hover:underline">Show All Orders</button>}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modals */}
            <Modal isOpen={isAddModalOpen} onClose={() => { setIsAddModalOpen(false); resetForm(); }} title="Add New Product">
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                        <ImageUpload label="Produce Photo" value={formData.image} onChange={(base64) => setFormData({...formData, image: base64})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Product Name</label>
                        <input className="input" placeholder="e.g. Tomatoes" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Category</label>
                        <select className="input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                            <option value="vegetables">Vegetables</option>
                            <option value="fruits">Fruits</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Price (₹)</label>
                        <input type="number" className="input" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Unit</label>
                        <select className="input" value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})}>
                            <option value="kg">Per kg</option>
                            <option value="piece">Per piece</option>
                            <option value="bunch">Per bunch</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Stock</label>
                        <input type="number" className="input" placeholder="Quantity" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Harvest Time</label>
                        <input type="datetime-local" className="input" value={formData.harvestTime} onChange={(e) => setFormData({...formData, harvestTime: e.target.value})} required />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-gray-700">Description</label>
                        <textarea className="input h-32" placeholder="Tell customers about your produce..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-full h-12 font-bold md:col-span-2 text-white shadow-xl shadow-primary-900/10">List Product</button>
                </form>
            </Modal>

            <Modal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); resetForm(); }} title="Edit Product">
                <form onSubmit={handleEditProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                        <ImageUpload label="Update Photo" value={formData.image} onChange={(base64) => setFormData({...formData, image: base64})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Product Name</label>
                        <input className="input" placeholder="e.g. Tomatoes" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Price (₹)</label>
                        <input type="number" className="input" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Stock</label>
                        <input type="number" className="input" placeholder="Quantity" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-bold text-gray-700">Description</label>
                        <textarea className="input h-32" placeholder="Tell customers about your produce..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-full h-12 font-bold md:col-span-2 text-white shadow-xl shadow-primary-900/10">Save Changes</button>
                </form>
            </Modal>

            <ProfileModal 
                isOpen={isProfileModalOpen} 
                onClose={() => setIsProfileModalOpen(false)} 
            />
        </div>
    );
};

export default FarmerDashboard;
