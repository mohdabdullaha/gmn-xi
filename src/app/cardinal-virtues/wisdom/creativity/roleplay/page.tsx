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

const heroImg = '/img.jpg';

const RolePlayCreativity = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { roleplay } = content.creativity;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle={roleplay.title} />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={roleplay.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Role Play"
                />

                <section className="py-24">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="bg-gray-50 rounded-3xl p-12 border border-gray-100 flex flex-col items-center">
                            <SectionHeading centered={true}>Role <span className="text-green">Play</span></SectionHeading>
                            <p className="text-xl text-navy font-bold mb-12 text-center">{roleplay.objective}</p>

                            <div className="grid md:grid-cols-2 gap-8 w-full">
                                {roleplay.scenarios.map((scenario: any, index: number) => (
                                    <motion.div key={scenario?.id || scenario?.title || index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:border-gold/30 transition-all flex flex-col">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-navy text-white rounded-2xl flex items-center justify-center font-bold">
                                                {index === 0 ? "A" : index === 1 ? "B" : index + 1}
                                            </div>
                                            <h4 className="text-2xl font-bold text-navy">
                                                {index === 0 ? "Ideator" : index === 1 ? "Responder" : `Role ${index + 1}`}
                                            </h4>
                                        </div>
                                        <p className="text-gray-600 text-lg leading-relaxed">{scenario}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-16 flex items-center gap-4 bg-navy text-white px-10 py-5 rounded-2xl shadow-xl">
                                <div className="animate-spin w-6 h-6 border-2 border-gold border-t-transparent rounded-full" />
                                <span className="text-lg font-bold tracking-widest uppercase">Switch roles after 1 minute</span>
                            </motion.div>
                            <div className="mt-12 w-full max-w-md mx-auto">
                                <AudioPlayer englishSrc={roleplay.audios?.english} />
                            </div>
                        </div>
                    </div>
                </section>

                <NavGrid section="creativity" />
            </main>

            <Footer />
        </div>
    );
};

export default RolePlayCreativity;
