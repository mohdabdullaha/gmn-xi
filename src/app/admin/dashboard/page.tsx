"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import {
    Video,
    FileText,
    MessageSquare,
    LogOut,
    ChevronRight,
    TrendingUp,
    Users,
    Eye,
    KeyRound,
    AlertCircle,
    CheckCircle,
    Loader2
} from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { videosApi, infographicsApi, inquiriesApi, authApi } from "@/services/api";

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState({ videos: 0, pdfs: 0, inquiries: 0 });

    // Change Password State
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });
    const [passStatus, setPassStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [passMessage, setPassMessage] = useState('');

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPassStatus('loading');
        try {
            await authApi.changePassword(passwords);
            setPassStatus('success');
            setPassMessage('Password updated successfully');
            setPasswords({ oldPassword: '', newPassword: '' });
            setTimeout(() => setPassStatus('idle'), 3000);
        } catch (err: any) {
            setPassStatus('error');
            setPassMessage(err?.response?.data?.message || 'Failed to update password');
        }
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [vidRes, infoRes, inqRes] = await Promise.all([
                    videosApi.getAll(),
                    infographicsApi.getAll(),
                    inquiriesApi.getAll()
                ]);
                setStats({
                    videos: vidRes.data.length,
                    pdfs: infoRes.data.length,
                    inquiries: inqRes.data.length
                });
            } catch (err) {
                console.error('Failed to fetch dashboard stats:', err);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        {
            title: 'Videos',
            count: stats.videos,
            icon: Video,
            link: '/admin/videos',
            color: 'bg-green/10 text-green',
            desc: 'Manage motivational videos & links'
        },
        {
            title: 'Learning Resources',
            count: stats.pdfs,
            icon: FileText,
            link: '/admin/pdfs',
            color: 'bg-blue-50 text-blue-600',
            desc: 'Manage infographics'
        },
        {
            title: 'Inquiries',
            count: stats.inquiries,
            icon: MessageSquare,
            link: '/admin/inquiries',
            color: 'bg-orange-50 text-orange-600',
            desc: 'View contact form submissions'
        }
    ];

    return (
        <PageLayout
            title="Dashboard"
            backPath="/"
            backLabel="BACK TO HOME"
            fullWidth
            action={
                <Button variant="danger" onClick={() => {
                    logout();
                    window.location.href = '/giftadmin';
                }} icon={LogOut}>
                    LOGOUT
                </Button>
            }
        >
            <div className="mb-12">
                <h1 className="text-4xl font-black text-navy tracking-tight">
                    WELCOME BACK, <span className="text-green uppercase">{user}</span>
                </h1>
                <p className="text-xl text-gray-500 mt-2">Manage your moral development platform effectively.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {cards.map((card: any, i: number) => (
                    <Link
                        key={card?.id || card?.title || i}
                        href={card.link}
                        className="bg-white p-8 rounded-3xl shadow-xl shadow-navy/5 border border-ice-border hover:border-green/30 hover:shadow-navy/10 transition-all group relative overflow-hidden"
                    >
                        <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <card.icon size={28} />
                        </div>

                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{card.title}</h2>
                                <p className="text-4xl font-black text-navy mt-1">{card.count}</p>
                            </div>
                            <div className="bg-ice w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-green group-hover:text-white transition-colors">
                                <ChevronRight size={20} />
                            </div>
                        </div>
                        <p className="mt-4 text-gray-500 text-sm">{card.desc}</p>
                    </Link>
                ))}
            </div>

            <div className="bg-white rounded-3xl p-8 border border-ice-border shadow-xl shadow-navy/5">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-navy p-2 rounded-xl">
                        <TrendingUp className="text-white" size={20} />
                    </div>
                    <h2 className="text-2xl font-bold text-navy">Quick Insights & Security</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Users size={14} /> Platform Summary
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <span className="text-navy font-semibold">Total Assets</span>
                                <span className="text-green font-bold">{stats.videos + stats.pdfs}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                <span className="text-navy font-semibold">Inquiry Response Rate</span>
                                <span className="text-orange-600 font-bold">100%</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Eye size={14} /> Database Status
                        </h3>
                        <div className="p-6 bg-navy text-white rounded-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-white/60 text-sm">GIFT Moral Nexus DB</p>
                                <p className="text-2xl font-bold mt-1">CONNECTED</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                                    <span className="text-xs font-semibold text-green uppercase tracking-widest">Active</span>
                                </div>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform">
                                <TrendingUp size={120} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <KeyRound size={14} /> Change Password
                        </h3>
                        <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl relative overflow-hidden">
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                {passStatus === 'error' && (
                                    <div className="p-3 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 border border-red-100 text-sm font-bold">
                                        <AlertCircle size={16} /> {passMessage}
                                    </div>
                                )}
                                {passStatus === 'success' && (
                                    <div className="p-3 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 border border-green-200 text-sm font-bold">
                                        <CheckCircle size={16} /> {passMessage}
                                    </div>
                                )}
                                <Input
                                    label="Current Password"
                                    type="password"
                                    value={passwords.oldPassword}
                                    onChange={(e) => setPasswords(p => ({ ...p, oldPassword: e.target.value }))}
                                    placeholder="••••••••"
                                    required
                                />
                                <Input
                                    label="New Password"
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords(p => ({ ...p, newPassword: e.target.value }))}
                                    placeholder="••••••••"
                                    required
                                />
                                <p className="text-xs text-gray-500 pl-1 -mt-2">
                                    Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                                </p>
                                <Button type="submit" disabled={passStatus === 'loading'} className="py-3 mt-2 text-sm w-full">
                                    {passStatus === 'loading' ? <Loader2 className="animate-spin" size={16} /> : 'UPDATE PASSWORD'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default AdminDashboard;
