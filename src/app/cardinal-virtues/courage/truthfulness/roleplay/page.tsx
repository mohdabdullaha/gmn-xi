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

const RolePlay = () => {
    const data = content.truthfulness.roleplay as any;

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
                    subtitle="Shujah / Courage"
                    intro="Applying Truthfulness in Real Life"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading>Interactive <span className="text-green">Role Play</span></SectionHeading>

                        <h3 className="text-green text-2xl font-bold mb-8 text-center italic">Objective: {data.objective}</h3>

                        <div className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm my-10 border-r-8 border-r-navy">
                            <ul className="space-y-6">
                                {data.scenarios.map((item: any, idx: number) => (
                                    <motion.li
                                        key={item?.id || item?.title || idx}
                                        initial={{ x: 20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white p-5 rounded-xl shadow-sm border border-ice-border text-gray-700 text-2xl leading-relaxed flex gap-4 items-center"
                                    >
                                        <div className="w-10 h-10 bg-navy text-white rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <AudioPlayer urduSrc={data.audios.urdu} englishSrc={data.audios.english} />
                    </div>

                    <NavGrid excludeId="roleplay" section="truthfulness" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default RolePlay;
