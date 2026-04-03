import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import FarmerDashboard from './pages/FarmerDashboard';
import Farmers from './pages/Farmers';
import FarmerProfile from './pages/FarmerProfile';
import Cart from './pages/Cart';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AuthContext } from './context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = React.useContext(AuthContext);
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/farmers" element={<Farmers />} />
                <Route path="/farmers/:id" element={<FarmerProfile />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute role="farmer">
                    <FarmerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
