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

const MirrorCreativity = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { mirror } = content.creativity;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle={mirror.title} />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={mirror.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Mirror Moments"
                />

                <section className="py-24">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100 flex flex-col items-center text-center">
                            <SectionHeading centered={true}>Mirror <span className="text-green">Moments</span></SectionHeading>
                            <p className="text-xl text-navy font-medium mb-4">{mirror.objective}</p>
                            <p className="text-gray-500 mb-12 text-lg italic leading-relaxed">"{mirror.text}"</p>

                            <div className="w-full space-y-8 text-left max-w-2xl">
                                {mirror.prompts.map((prompt: any, index: number) => (
                                    <motion.div key={prompt?.id || prompt?.title || index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                        <label className="block text-navy font-bold text-lg mb-4">{prompt}</label>
                                        <div className="h-16 w-full border-b-2 border-dashed border-gold/40 hover:border-gold transition-colors focus-within:border-gold" />
                                    </motion.div>
                                ))}
                            </div>

                            <p className="mt-16 text-gray-400 text-sm font-medium uppercase tracking-widest">{mirror.footer}</p>
                        </div>
                        <div className="mt-12 max-w-2xl mx-auto">
                            <AudioPlayer englishSrc={mirror.audios?.english} />
                        </div>
                    </div>
                </section>

                <NavGrid section="creativity" />
            </main>

            <Footer />
        </div>
    );
};

export default MirrorCreativity;
