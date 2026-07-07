"use client";
import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authApi } from "@/services/api";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await authApi.forgotPassword(email);
            setStatus('success');
            setMessage(res.data.message || 'If an account exists, a reset link has been sent to your email.');
        } catch (err: any) {
            setStatus('error');
            setMessage(err?.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-ice flex flex-col">
            <Navbar pageTitle="Forgot Password" />
            
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
                                    <Mail className="text-white" size={32} />
                                </div>
                                <h1 className="text-3xl font-black text-white tracking-tight">Reset Password</h1>
                                <p className="text-white/60 font-medium mt-2">Enter your admin email to receive a secure link.</p>
                            </div>
                        </div>

                        <div className="p-10">
                            {status === 'success' ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-6"
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="text-green-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-navy mb-2">Check Your Email</h3>
                                    <p className="text-gray-500">{message}</p>
                                    <a href="/giftadmin" className="block mt-8 text-navy font-bold hover:text-gold transition-colors">
                                        Return to Login
                                    </a>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {status === 'error' && (
                                        <motion.div 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100"
                                        >
                                            <AlertCircle size={20} />
                                            <p className="text-sm font-bold">{message}</p>
                                        </motion.div>
                                    )}

                                    <Input 
                                        label="Admin Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@gift.edu.pk"
                                        icon={Mail}
                                        required
                                    />

                                    <Button 
                                        type="submit" 
                                        fullWidth 
                                        disabled={status === 'loading'}
                                        className="py-4 mt-4"
                                    >
                                        {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'SEND RESET LINK'}
                                    </Button>
                                    
                                    <div className="text-center mt-6">
                                        <a href="/giftadmin" className="text-sm text-gray-500 hover:text-navy font-bold transition-colors">
                                            ← Back to Login
                                        </a>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default ForgotPassword;
