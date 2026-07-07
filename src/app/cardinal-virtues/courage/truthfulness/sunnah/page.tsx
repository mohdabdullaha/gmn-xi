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

const SunnahTruthfulness = () => {
    const data = content.truthfulness.sunnah as any;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Sunnah" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Shujah / Courage"
                    intro="Prophetic Guidance on Truthfulness"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-5xl mx-auto">
                        <SectionHeading>Prophetic Guidance on <span className="text-green">Truthfulness</span></SectionHeading>

                        <div className="space-y-8 my-10">
                            {data.insights.map((item: any, idx: number) => (
                                <motion.div
                                    key={item?.id || item?.title || idx}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm text-left relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-green group-hover:w-3 transition-all" />
                                    <h4 className="text-navy font-bold text-xl mb-3">{item.title}</h4>
                                    <p className="text-gray-700 text-2xl italic mb-4">"{item.text}"</p>
                                    <p className="text-right text-navy/60 font-medium">{item.ref}</p>
                                </motion.div>
                            ))}
                        </div>

                        <AudioPlayer urduSrc={data.audios.urdu} englishSrc={data.audios.english} />
                    </div>

                    <NavGrid excludeId="sunnah" section="truthfulness" />
                </section>
            </main>

            <Footer />
        </div >
    );
};

export default SunnahTruthfulness;
