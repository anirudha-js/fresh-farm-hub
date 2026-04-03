import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err || 'Failed to login. Please check your credentials.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-gray-50">
            <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
                    <p className="text-gray-500 font-medium tracking-tight">Login to your account to continue</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input pl-12 h-12"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-bold text-gray-700">Password</label>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="input pl-12 pr-12 h-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full h-12 text-lg font-bold group"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : (
                            <>
                                Sign In
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="pt-6 border-t border-gray-50 text-center">
                    <p className="text-sm text-gray-500 font-medium">
                        Don't have an account? <Link to="/register" className="text-primary-600 font-black hover:text-primary-700">Join Farm Community</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
