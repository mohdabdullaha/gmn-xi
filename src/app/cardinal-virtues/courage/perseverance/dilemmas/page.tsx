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
import { Scale } from 'lucide-react';

const heroImg = '/img.jpg';

const Dilemmas = () => {
    const data = content.perseverance.dilemmas as any;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Dilemmas" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Shujah / Courage"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto space-y-12">
                        <SectionHeading>Ethical <span className="text-green">Dilemmas</span></SectionHeading>

                        <div className="grid md:grid-cols-2 gap-6">
                            {data.scenarios.map((scenario: any, idx: number) => (
                                <motion.div 
                                    key={scenario?.id || scenario?.title || idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-ice border border-ice-border p-8 rounded-2xl flex flex-col gap-4"
                                >
                                    <Scale className="text-navy" size={32} />
                                    <p className="text-xl text-gray-800 leading-relaxed font-medium">
                                        "{scenario}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {data.audios && <AudioPlayer urduSrc={data.audios.urdu} englishSrc={data.audios.english} />}
                    </div>

                    <div className="mt-16">
                        <NavGrid excludeId="dilemmas" section="perseverance" />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Dilemmas;
