"use client";
import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumHero from "@/components/PremiumHero";
import AudioPlayer from "@/components/AudioPlayer";
import NavGrid from "@/components/NavGrid";
import { motion } from 'framer-motion';
import SectionHeading from "@/components/SectionHeading";
import { Scale } from 'lucide-react';
import { content } from "@/data/content";

const heroImg = '/img.jpg';

const Dilemmas = () => {
    const data = content.selfRegulation.dilemmas as any;

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
                    subtitle="Iffah / Temperance"
                    intro="Real-World Self-Regulation Choices"
                />

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <div className="max-w-4xl mx-auto space-y-12">
                        
                        <SectionHeading>Ethical <span className="text-green">Dilemmas</span></SectionHeading>

                        <div className="grid gap-8 my-10">
                            {data.scenarios.map((scenario: any, idx: number) => (
                                <motion.div 
                                    key={scenario?.id || scenario?.title || idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-navy group-hover:bg-green transition-colors" />
                                    <div className="flex gap-6 items-start">
                                        <div className="bg-white p-4 rounded-full shadow-sm text-navy group-hover:text-green transition-colors">
                                            <Scale size={28} />
                                        </div>
                                        <div>
                                            <h4 className="text-green font-bold mb-2 uppercase tracking-wider text-sm">Scenario {idx + 1}</h4>
                                            <p className="text-xl text-gray-800 leading-relaxed">{scenario}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {data.audios && <AudioPlayer englishSrc={data.audios.english} />}
                    </div>

                    <NavGrid excludeId="dilemmas" section="selfRegulation" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Dilemmas;
