"use client";
import React, { Suspense, useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

import { motion } from 'framer-motion';
import { KeyRound, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { authApi } from "@/services/api";

const ResetPasswordContent: React.FC = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
        () => (!token ? 'error' : 'idle')
    );
    const [message, setMessage] = useState(
        () => (!token ? 'No reset token provided. Please use the link from your email.' : '')
    );

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setStatus('error');
            setMessage('Passwords do not match.');
            return;
        }

        if (!token) return;

        setStatus('loading');

        try {
            const res = await authApi.resetPassword({ token, password });
            setStatus('success');
            setMessage(res.data.message || 'Password has been successfully reset.');
        } catch (err: any) {
            setStatus('error');
            setMessage(err?.response?.data?.message || 'Failed to reset password. The token may be expired.');
        }
    };

    return (
        <div className="min-h-screen bg-ice flex flex-col">
            <Navbar pageTitle="Reset Password" />
            
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
                                    <KeyRound className="text-white" size={32} />
                                </div>
                                <h1 className="text-3xl font-black text-white tracking-tight">New Password</h1>
                                <p className="text-white/60 font-medium mt-2">Enter your new secure password.</p>
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
                                    <h3 className="text-xl font-bold text-navy mb-2">Password Reset</h3>
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
                                            <AlertCircle size={20} className="flex-shrink-0" />
                                            <p className="text-sm font-bold">{message}</p>
                                        </motion.div>
                                    )}

                                    <Input 
                                        label="New Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        icon={KeyRound}
                                        required
                                        disabled={!token || status === 'loading'}
                                    />
                                    
                                    <p className="text-xs text-gray-500 -mt-4 pl-1">
                                        Must be at least 8 chars, contain 1 uppercase, 1 lowercase, 1 number, and 1 special character.
                                    </p>

                                    <Input 
                                        label="Confirm Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        icon={KeyRound}
                                        required
                                        disabled={!token || status === 'loading'}
                                    />

                                    <Button 
                                        type="submit" 
                                        fullWidth 
                                        disabled={!token || status === 'loading'}
                                        className="py-4 mt-4"
                                    >
                                        {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : 'SET NEW PASSWORD'}
                                    </Button>
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

const ResetPassword: React.FC = () => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div style={{ width: 40, height: 40, border: '4px solid #e2e8f0', borderTopColor: '#1a3c5e', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /></div>}>
        <ResetPasswordContent />
    </Suspense>
);

export default ResetPassword;
