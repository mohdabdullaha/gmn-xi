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

const RolePlayCuriosity = () => {
    const data = content.curiosity.roleplay as any;

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar pageTitle="Role Play" />

            <main className="flex-grow">
                <PremiumHero 
                    image={heroImg}
                    title={data.title}
                    subtitle="Hikmah /Knowledge & Wisdom"
                    intro="Bringing Questions to Life"
                />

                <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeading>Role <span className="text-green">Play</span></SectionHeading>
                        <p className="text-gray-600 text-xl mt-4">{data.objective}</p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="bg-ice border border-ice-border p-8 rounded-2xl shadow-sm my-10 border-t-8 border-t-green"
                        >
                            <ul className="space-y-6">
                                {data.scenarios.map((s: any, idx: number) => (
                                    <li key={s?.id || s?.title || idx} className="bg-white p-5 rounded-xl border border-ice-border text-gray-700 text-2xl leading-relaxed text-left">
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {data.audios?.english && (
                            <AudioPlayer englishSrc={data.audios.english} />
                        )}
                    </div>

                    <NavGrid excludeId="curiosity-roleplay" section="curiosity" />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default RolePlayCuriosity;
