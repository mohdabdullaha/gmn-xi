"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";
import { FileText, Download, Loader2 } from 'lucide-react';
import { getAssetUrl } from "@/utils/assets";


import { useResources } from "@/hooks/useResources";

const Infographics = () => {
    const { data: pdfs, loading, refresh } = useResources('infographics');

    useEffect(() => {
        window.scrollTo(0, 0);
        refresh();
    }, [refresh]);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Infographics" />

            <main className="flex-grow py-14 px-6">
                <div className="max-w-5xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-12"
                    >
                        <SectionHeading>50 BEST SELLER BOOKS <span className="text-green">INFOGRAPHICS</span></SectionHeading>

                        <p className="text-2xl text-gray-700 mt-6 italic font-medium max-w-xl mx-auto text-center">
                            "Visual summaries of life-changing wisdom from the world's greatest literature."
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="animate-spin text-navy" size={48} />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8">
                            {Array.isArray(pdfs) && [...pdfs].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((pdf: any, idx) => (
                                <motion.div
                                    key={pdf._id || idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-white border border-ice-border rounded-3xl p-7 shadow-lg flex flex-col hover:shadow-navy/10 transition-shadow group"
                                >

                                    <div className="bg-ice w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-navy transition-colors">
                                        <FileText className="text-navy group-hover:text-white transition-colors" size={24} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-navy mb-2 tracking-tight">
                                        {pdf.title}
                                    </h3>

                                    <p className="text-xl text-gray-500 italic mb-8 flex-grow">
                                        {pdf.desc}
                                    </p>

                                    <Link
                                        href={`/view-pdf?title=${encodeURIComponent(pdf.title)}&url=${encodeURIComponent(getAssetUrl(pdf.fileUrl || pdf.file))}`}
                                        className="flex items-center justify-center gap-2 bg-navy hover:bg-navy-dark text-white font-semibold py-3 rounded-xl shadow-md transition-all active:scale-95 group"
                                    >
                                        <Download size={18} />
                                        VIEW PDF
                                    </Link>

                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Infographics;