"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

const AdminLogin: React.FC = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(credentials);
            window.location.href = '/admin/dashboard';
        } catch (err: any) {
            const message = err?.response?.data?.message || err.message || 'Invalid credentials. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-ice flex flex-col">
            <Navbar pageTitle="Admin Login" />
            
            <main className="flex-grow flex items-center justify-center px-6 py-12">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-navy/10 overflow-hidden border border-ice-border">
                        <div className="bg-navy p-10 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Lock className="text-white" size={32} />
                                </div>
                                <h1 className="text-3xl font-black text-white tracking-tight">Admin Portal</h1>
                                <p className="text-white/60 font-medium mt-2">GIFT Moral Nexus Management</p>
                            </div>
                        </div>

                        <div className="p-10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100"
                                    >
                                        <AlertCircle size={20} />
                                        <p className="text-sm font-bold">{error}</p>
                                    </motion.div>
                                )}

                                <Input 
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    placeholder="admin@gift.edu.pk"
                                    icon={User}
                                    required
                                />

                                <div>
                                    <Input 
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        icon={Lock}
                                        required
                                    />
                                    <div className="flex justify-end mt-2">
                                        <a href="/giftadmin/forgot-password" className="text-sm text-navy hover:text-gold font-bold transition-colors">
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>

                                <Button 
                                    type="submit" 
                                    fullWidth 
                                    disabled={loading}
                                    className="py-4 mt-4"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'LOGIN TO DASHBOARD'}
                                </Button>
                                
                                <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest mt-8">
                                    Authorized Personnel Only
                                </p>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminLogin;
