"use client";
import React, { useState, ChangeEvent } from 'react';
import { 
    Trash2, 
    MessageSquare, 
    AlertCircle,
    Loader2,
    Calendar,
    User,
    Mail,
    Search
} from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useInquiries } from "@/hooks/useInquiries";

const InquiryManager: React.FC = () => {
    const { inquiries, loading, error, deleteInquiry } = useInquiries();
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = async (id: string) => {
        if (!window.confirm('Mark this inquiry as resolved and delete it?')) return;
        try {
            await deleteInquiry(id);
        } catch (err: any) {
            alert(err.message || 'Failed to delete inquiry');
        }
    };

    const filteredInquiries = inquiries.filter(iq => 
        iq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        iq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        iq.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PageLayout title="Inquiries">
            <div className="flex justify-end mb-8">
                <div className="w-full md:w-96">
                    <Input 
                        placeholder="Search inquiries..."
                        value={searchTerm}
                        onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchTerm(e.target.value)}
                        icon={Search}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-black text-navy uppercase tracking-tight flex items-center gap-3 mb-6">
                    <MessageSquare className="text-green" size={24} />
                    Contact <span className="text-green">Inquiries</span>
                </h2>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-navy" size={32} />
                    </div>
                ) : error ? (
                    <div className="p-6 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100">
                        <AlertCircle size={24} />
                        <p>{error}</p>
                    </div>
                ) : filteredInquiries.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <MessageSquare className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500 font-medium">No inquiries found matching your search.</p>
                    </div>
                ) : (
                    filteredInquiries.map((iq) => (
                        <div key={iq._id} className="bg-white rounded-3xl border border-ice-border shadow-xl shadow-navy/5 overflow-hidden group hover:border-green/30 transition-all">
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-navy">
                                            <User size={18} className="text-green" />
                                            <span className="text-xl font-bold">{iq.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500">
                                            <Mail size={16} />
                                            <a href={`mailto:${iq.email}`} className="hover:text-green transition-colors font-medium">{iq.email}</a>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Calendar size={14} />
                                            <span>{iq.createdAt ? new Date(iq.createdAt).toLocaleString() : 'N/A'}</span>
                                        </div>
                                    </div>

                                    <Button 
                                        variant="danger" 
                                        onClick={() => handleDelete(iq._id)} 
                                        icon={Trash2}
                                    >
                                        RESOLVE & DELETE
                                    </Button>
                                </div>

                                <div className="bg-ice/50 p-6 rounded-2xl border border-ice-border">
                                    <p className="text-navy/80 leading-relaxed whitespace-pre-wrap italic">
                                        "{iq.message}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </PageLayout>
    );
};

export default InquiryManager;
