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

const SunnahCreativity = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const { sunnah } = content.creativity;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle={sunnah.title} />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={sunnah.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Prophetic Guidance"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-5xl mx-auto">
                        <SectionHeading>Prophetic <span className="text-green">Guidance</span></SectionHeading>

                        <div className="space-y-8 my-10">
                            {sunnah.insights.map((item: any, idx: number) => (
                                <motion.div
                                    key={item?.id || item?.title || idx}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm text-left relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-green group-hover:w-3 transition-all" />
                                    <h4 className="text-navy font-bold text-xl mb-3">{item.title}</h4>
                                    {item.arabic && (
                                        <p className="text-right text-2xl font-arabic text-navy/80 mb-4 leading-loose" dir="rtl">{item.arabic}</p>
                                    )}
                                    {item.urdu && (
                                        <p className="text-right font-urdu text-xl text-navy/70 mb-4 leading-relaxed" dir="rtl">{item.urdu}</p>
                                    )}
                                    <p className="text-gray-700 text-xl italic mb-4">"{item.text}"</p>
                                    <p className="text-right text-navy/60 font-medium text-sm mb-4">{item.ref}</p>
                                    {item.audio && (
                                        <div className="mt-6 pt-6 border-t border-ice-border">
                                            <AudioPlayer englishSrc={item.audio} variant="minimal" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <NavGrid section="creativity" />
            </main>

            <Footer />
        </div>
    );
};

export default SunnahCreativity;
