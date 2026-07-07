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

const DilemmasLFL = () => {
    const data = content.loveForLearning.dilemmas as any;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Dilemmas" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Ethical Challenges in Learning"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading><span className="text-green">Dilemmas</span></SectionHeading>

                        <div className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm my-10 border-t-8 border-t-green">
                            <ul className="space-y-6">
                                {data.scenarios.map((item: any, idx: number) => (
                                    <motion.li
                                        key={item?.id || item?.title || idx}
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white p-5 rounded-xl shadow-sm border border-ice-border text-gray-700 text-2xl leading-relaxed list-disc list-inside marker:text-green marker:text-2xl"
                                    >
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                        <AudioPlayer englishSrc={data.audios?.english} />
                    </div>

                    <NavGrid excludeId="lfl-dilemmas" section="loveForLearning" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default DilemmasLFL;
