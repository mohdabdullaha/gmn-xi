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

const DilemmasCreativity = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { dilemmas } = content.creativity;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle={dilemmas.title} />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={dilemmas.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Dilemmas"
                />

                <section className="py-24">
                    <div className="max-w-6xl mx-auto px-6">
                        <SectionHeading centered={true}><span className="text-green">Dilemmas</span></SectionHeading>
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            {dilemmas.scenarios.map((scenario: any, index: number) => (
                                <motion.div key={scenario?.id || scenario?.title || index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 hover:border-gold/30 hover:-translate-y-2 transition-all group">
                                    <div className="text-6xl text-gold/20 font-bold mb-4 group-hover:text-gold/40 transition-colors">{String(index + 1).padStart(2, '0')}</div>
                                    <h3 className="text-2xl font-bold text-navy mb-6 leading-tight">Scenario {index + 1}</h3>
                                    <p className="text-gray-600 text-lg leading-relaxed">{scenario}</p>
                                    <div className="mt-8 pt-6 border-t border-gray-50">
                                        <p className="text-navy font-bold text-sm uppercase tracking-widest flex items-center gap-2 text-green">
                                            What would you do?
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-12 max-w-2xl mx-auto">
                            <AudioPlayer englishSrc={dilemmas.audios?.english} />
                        </div>
                    </div>
                </section>

                <NavGrid section="creativity" />
            </main>

            <Footer />
        </div>
    );
};

export default DilemmasCreativity;
