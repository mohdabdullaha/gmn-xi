"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import AudioPlayer from "@/components/AudioPlayer";
import NavGrid from "@/components/NavGrid";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";
import { content } from "@/data/content";
import { Users } from 'lucide-react';

const heroImg = '/img.jpg';

const RolePlay = () => {
    const data = content.selfRegulation.roleplay as any;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Role Play" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Iffah / Temperance"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-3xl mx-auto space-y-12">
                        <SectionHeading>Interactive <span className="text-green">Role Play</span></SectionHeading>

                        <div className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm">
                            <h3 className="text-2xl font-bold text-navy mb-8 text-center border-b pb-4">
                                {data.objective}
                            </h3>

                            <div className="space-y-6">
                                {data.scenarios.map((scenario: any, idx: number) => (
                                    <motion.div 
                                        key={scenario?.id || scenario?.title || idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="flex gap-4 items-start bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
                                    >
                                        <Users className="text-green shrink-0 mt-1" size={24} />
                                        <p className="text-lg text-gray-800 leading-relaxed font-medium">
                                            {scenario}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {data.audios && <AudioPlayer urduSrc={data.audios.urdu} englishSrc={data.audios.english} />}
                    </div>

                    <div className="mt-16">
                        <NavGrid excludeId="roleplay" section="selfRegulation" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default RolePlay;
