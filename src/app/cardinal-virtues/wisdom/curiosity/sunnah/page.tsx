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

const SunnahCuriosity = () => {
    const data = content.curiosity.sunnah as any;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Prophetic Guidance" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Prophetic Guidance on Curiosity"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading centered={false}>Prophetic <span className="text-green">Guidance</span></SectionHeading>

                        {data.insights.map((insight: any, idx: number) => (
                            <motion.div
                                key={insight?.id || insight?.title || idx}
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-ice border border-ice-border rounded-2xl p-8 shadow-sm mt-8 border-t-8 border-t-green"
                            >
                                <h3 className="text-navy text-2xl font-bold mb-6">{insight.title}</h3>
                                <p className="text-right text-2xl text-gray-800 leading-loose font-arabic mb-6 dir-rtl">{insight.arabic}</p>
                                <p className="text-gray-700 text-xl leading-relaxed mb-4">{insight.text}</p>
                                <p className="text-green font-bold text-sm tracking-wide mb-6">{insight.ref}</p>
                                {insight.audio && (
                                    <div className="-mx-8 -mb-8 mt-4 border-t border-ice-border/50">
                                        <AudioPlayer englishSrc={insight.audio} variant="minimal" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    <NavGrid excludeId="curiosity-sunnah" section="curiosity" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SunnahCuriosity;
